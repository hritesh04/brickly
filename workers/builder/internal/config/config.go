package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type RabbitMQConfig struct {
	URL   string
	Queue string
}

type ObjectStoreConfig struct {
	AccessKey string
	SecretKey string
	Region    string
	Bucket    string
}

type DBConfig struct {
	Url string
}

type Config struct {
	Env string
	DB DBConfig 
	RabbitMQ RabbitMQConfig
	ObjectStore ObjectStoreConfig
}

func LoadConfig(log *log.Logger) (*Config, error) {
	err := godotenv.Load()
	if err != nil {
		return nil,err
	}
	env := os.Getenv("ENV")
	if env == "" {
		log.Println("ENV not set, defaulting to DEV")
		env = "DEV"
	}
	rabbitMQUrl := os.Getenv("RABBITMQ_URL")
	if rabbitMQUrl == "" {
		log.Println("RABBITMQ_URL not set, defaulting to amqp://myuser:mypassword@localhost:5672/")
		rabbitMQUrl = "amqp://myuser:mypassword@localhost:5672/"
	}
	queue := os.Getenv("RABBITMQ_QUEUE")
	if queue == "" {
		queue = "build"
	}
	accessKey := os.Getenv("OBJECT_STORE_ACCESS_KEY")
	if accessKey == "" {
		log.Println("OBJECT_STORE_ACCESS_KEY not set, defaulting to accessKey")
		accessKey = "minioadmin"
		
	}
	secretKey := os.Getenv("OBJECT_STORE_SECRET_KEY")
	if secretKey == "" {
		log.Println("OBJECT_STORE_SECRET_KEY not set, defaulting to secretKey")
		secretKey = "minioadmin"
	}
	region := os.Getenv("OBJECT_STORE_REGION")
	if region == "" {
		log.Println("OBJECT_STORE_REGION not set, defaulting to us-east-1")
		region = "us-east-1"
	}
	bucket := os.Getenv("OBJECT_STORE_BUCKET")
	if bucket == "" {
		log.Println("OBJECT_STORE_BUCKET not set, defaulting to builder")
		bucket = "builds"
	}
	dbUrl := os.Getenv("DB_URL")
	if dbUrl == "" {
		log.Println("DB_URL not set, defaulting to postgresql://postgres:postgres@localhost:5432/blockly")
		dbUrl = "postgresql://postgres:postgres@localhost:5432/blockly"
	}

	return &Config{
		Env: env,
		DB: DBConfig{
			Url: dbUrl,
		},
		RabbitMQ: RabbitMQConfig{
			URL:   rabbitMQUrl,
			Queue: queue,
		},
		ObjectStore: ObjectStoreConfig{
			AccessKey: accessKey,
			SecretKey: secretKey,
			Region:    region,
			Bucket:    bucket,
		},
	}, nil
}