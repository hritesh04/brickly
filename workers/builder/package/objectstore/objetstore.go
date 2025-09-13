package objectStore

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	cfg "github.com/hritesh04/blockly/builder/internal/config"
)

type IObjectStore interface {
	GetProject(key string) ([]byte,error)
}

type ObjectStore struct {
	client *s3.Client
	bucket string
	log *log.Logger
}

func New(cfg cfg.ObjectStoreConfig, logger *log.Logger) (*ObjectStore,error) {
	loadCfg, err := config.LoadDefaultConfig(context.TODO(),config.WithRegion(cfg.Region),config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(cfg.AccessKey, cfg.SecretKey, "")))
	
	if err != nil {
		logger.Fatalf("failed to load config: %v", err)
		return nil,err
	}

	client := s3.NewFromConfig(loadCfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String("http://127.0.0.1:9000")
		o.UsePathStyle = true
	})	
	

	return &ObjectStore{
		client,
		cfg.Bucket,
		logger,
	},nil
}

func (o *ObjectStore) GetProject(key string) (*s3.GetObjectOutput,error) {
	out,err := o.client.GetObject(context.TODO(),&s3.GetObjectInput{
		Bucket: &o.bucket,
		Key: &key,
	})
	if err != nil {
		o.log.Println("Error getting object from S3:", err)
		return nil,err
	}
	return out,nil
}

func (o *ObjectStore) PutProject(key string, project *os.File) error { 
	// data,err := io.ReadAll(project)
	// if err != nil {
		// o.log.Println("Error reading project data:", err)
		// return err
	// }
	_, err := o.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &o.bucket,
		Key:    &key,
		Body:   project,
	})
	if err != nil {
		o.log.Println("Error putting object to S3:", err)
		return err
	}
	return nil
}