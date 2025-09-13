package logger

import (
	"log"
	"os"
)

func NewLogger() *log.Logger {
	logger := log.New(os.Stdout,"[GODOT BUILDER] ",log.LstdFlags)
	return logger
}