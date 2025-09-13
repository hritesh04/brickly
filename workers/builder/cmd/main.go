package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"os/signal"
	"path"
	"strings"
	"syscall"

	"github.com/hritesh04/blockly/builder/internal/config"
	"github.com/hritesh04/blockly/builder/internal/logger"
	objectStore "github.com/hritesh04/blockly/builder/package/objectstore"
	rabbitmq "github.com/hritesh04/blockly/builder/package/rabbitmq"
)

func main(){
	logger := logger.NewLogger()
	cfg, err := config.LoadConfig(logger)
	if err != nil {
		println("Error loading config:", err)
		return
	}


	sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)


	objStore,err := objectStore.New(cfg.ObjectStore,logger)
	if err != nil {
		panic(err)
	}
	queue,err := rabbitmq.Connect(cfg.RabbitMQ,logger)
	if err != nil {
		panic(err)
	}
	go func(){
		taskChn := queue.Consume()
		for task := range taskChn {
			logger.Println("Received a build task")
			var taskObj rabbitmq.Task
				if err := json.Unmarshal(task.Body, &taskObj); err != nil {
					logger.Println("Error unmarshalling JSON : ", err)
					task.Nack(false,true)
					return
			}
			logger.Printf("Building for object key : %v and export type : %v\n", taskObj.Key,taskObj.BuildType)
		
			obj,err := objStore.GetProject(taskObj.Key)
			if err != nil {
				logger.Println("Error getting object from object store : ", err)
				task.Nack(false,true)
				return
			}
			
			projectZipPath := path.Join("/tmp",taskObj.Key)
			logger.Println("local project zip path : ",projectZipPath)
			projectZip, err := os.Create(projectZipPath)
			if err != nil {
				logger.Println("Error creating zip file: ", err)
				task.Nack(false,true)
				return
			}
			data,err := io.ReadAll(obj.Body)
			if err != nil {
				logger.Println("Error reading object body: ", err)
				task.Nack(false,true)
				return
			}
			projectZip.Write(data)

			unZipCmd := exec.Command("tar", "-xvf", projectZip.Name(), "-C", "/tmp/")
			
			unZipErr := unZipCmd.Run()
			if unZipErr != nil {
				logger.Println("Error unzipping file: ", unZipErr)
				task.Nack(false,true)
				return
			}
			
			unZipProjectPath := strings.Split(projectZip.Name(), ".")[0]
			logger.Println("Unzipped project path : ",unZipProjectPath)
			buildPath := path.Join(unZipProjectPath, taskObj.BuildType)
			exec.Command("mkdir", buildPath).Run()
			logger.Println("Build path : ",buildPath)		

			buildCmd := exec.Command("godot", "--headless", "--verbose", "--export-release", taskObj.BuildType, buildPath+"/index.html")
			buildCmd.Dir = unZipProjectPath

			_, buildErr := buildCmd.CombinedOutput()
			if buildErr != nil {
				logger.Println("Error building project:", err)
				task.Nack(false, true)
				return
			}

			buildZipDir := taskObj.BuildType+".tar.gz"
			zipCmd := exec.Command("tar", "-czf", buildZipDir, "-C",buildPath,".")
			zipCmd.Dir = unZipProjectPath

			zipErr := zipCmd.Run()
			if zipErr != nil {
				logger.Println("Error zipping build: ", zipErr)
				task.Nack(false,true)
				return
			}

			buildZipPath := path.Join(unZipProjectPath,buildZipDir)
			logger.Println("Build zip path : ",buildZipPath)
			builtFile, err := os.Open(buildZipPath)
			if err != nil {
				logger.Println("Error opening built file: ", err)
				task.Nack(false,true)
				return
			}

			buildKey := strings.Split(unZipProjectPath,"/")[2] + "_" + taskObj.BuildType+".tar.gz"
			fmt.Println("Uploading built file with key:", buildKey)
			err = objStore.PutProject(buildKey, builtFile)
			if err != nil {
				logger.Println("Error uploading built file to object store: ", err)
				task.Nack(false,true)
				return
			}
			task.Ack(false)
			logger.Println("Task processed successfully for key:", taskObj.Key, " and saved as : ",buildKey)
		}
	}()

	<-sigChan
    logger.Println("Received shutdown signal, initiating graceful shutdown...")
}