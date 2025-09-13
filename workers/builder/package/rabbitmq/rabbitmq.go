package rabbitmq

import (
	"log"

	"github.com/hritesh04/blockly/builder/internal/config"
	amqp "github.com/rabbitmq/amqp091-go"
)

type Queue struct {
	conn   *amqp.Connection
	channel *amqp.Channel
	queue amqp.Queue
	log *log.Logger
}

type Task struct{
	Key string `json:"key"`
	BuildType string `json:"buildType"`
}

func Connect(cfg config.RabbitMQConfig, logger *log.Logger) (*Queue, error) {
	conn,err := amqp.Dial(cfg.URL)
	if err != nil {
		logger.Fatalln("Failed to connect to RabbitMQ:",err)
	}
	logger.Println("Connected to RabbitMQ")
	channel,err := conn.Channel()
	if err != nil {
		logger.Fatalln("Failed to open a channel:",err)
	}
	queue, err := channel.QueueDeclare(cfg.Queue,true,false,false,false,nil)
	if err != nil {
		logger.Fatalln("Failed to declare a queue:",err)
	}
	return &Queue{
		conn,
		channel,
		queue,
		logger,
	},nil
}

func (q *Queue) Consume() <-chan amqp.Delivery {
	channel := q.channel
	dataChn, err := channel.Consume(
		q.queue.Name, // queue
		"",     // consumer
		false,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		q.log.Fatalln("Failed to register a consumer:", err)
	}
	// var task QueueTask
	// if err := json.Unmarshal(data.Body, &task); err != nil {
		// log.Println("Error unmarshalling JSON:", err)
		// data.Nack()
	// }
	return dataChn
}