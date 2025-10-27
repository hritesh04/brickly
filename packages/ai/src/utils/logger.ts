import chalk from "chalk";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  debug(message: string, data?: any) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    console.log(chalk.gray(`[${this.formatTimestamp()}] [DEBUG] ${message}`));
    if (data) {
      console.dir(data, { depth: null, colors: true });
    }
  }

  info(message: string, data?: any) {
    if (!this.shouldLog(LogLevel.INFO)) return;
    console.log(chalk.blue(`[${this.formatTimestamp()}] [INFO] ${message}`));
    if (data) {
      console.dir(data, { depth: null, colors: true });
    }
  }

  warn(message: string, data?: any) {
    if (!this.shouldLog(LogLevel.WARN)) return;
    console.log(chalk.yellow(`[${this.formatTimestamp()}] [WARN] ${message}`));
    if (data) {
      console.dir(data, { depth: null, colors: true });
    }
  }

  error(message: string, error?: any) {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    console.log(chalk.red(`[${this.formatTimestamp()}] [ERROR] ${message}`));
    if (error) {
      if (error instanceof Error) {
        console.error(chalk.red(error.stack || error.message));
      } else {
        console.dir(error, { depth: null, colors: true });
      }
    }
  }

  modelCall(agentName: string, messageCount: number) {
    console.log(
      chalk.magenta(
        `[${this.formatTimestamp()}] [MODEL] 🤖 Calling model for ${chalk.bold(
          agentName
        )} with ${messageCount} message(s)`
      )
    );
  }

  modelResponse(agentName: string, contentPreview: string) {
    const preview =
      contentPreview.length > 100
        ? contentPreview.substring(0, 100) + "..."
        : contentPreview;
    console.log(
      chalk.magenta(
        `[${this.formatTimestamp()}] [MODEL] ✓ ${chalk.bold(
          agentName
        )} responded: ${chalk.italic(preview)}`
      )
    );
  }

  toolCall(toolName: string, args: any) {
    console.log(
      chalk.cyan(
        `[${this.formatTimestamp()}] [TOOL] 🔧 Executing: ${chalk.bold(
          toolName
        )}`
      )
    );
    console.log(chalk.cyan("  Arguments:"));
    console.dir(args, { depth: null, colors: true });
  }

  toolSuccess(toolName: string, result: any) {
    const resultPreview =
      typeof result === "string"
        ? result.length > 150
          ? result.substring(0, 150) + "..."
          : result
        : JSON.stringify(result).substring(0, 150);

    console.log(
      chalk.green(
        `[${this.formatTimestamp()}] [TOOL] ✓ ${chalk.bold(
          toolName
        )} completed successfully`
      )
    );
    console.log(chalk.green(`  Result: ${resultPreview}`));
  }

  toolError(toolName: string, error: any) {
    console.log(
      chalk.red(
        `[${this.formatTimestamp()}] [TOOL] ✗ ${chalk.bold(toolName)} failed`
      )
    );
    if (error instanceof Error) {
      console.error(chalk.red(`  Error: ${error.message}`));
    } else {
      console.error(chalk.red(`  Error: ${JSON.stringify(error)}`));
    }
  }

  agentInvoke(agentName: string, query: string, session?: string) {
    console.log(
      chalk.blueBright(
        `[${this.formatTimestamp()}] [AGENT] 🎯 Invoking ${chalk.bold(
          agentName
        )}`
      )
    );
    console.log(chalk.blueBright(`  Query: ${query}`));
    if (session) {
      console.log(chalk.blueBright(`  Session: ${session}`));
    }
  }

  agentComplete(agentName: string, messageCount: number) {
    console.log(
      chalk.green(
        `[${this.formatTimestamp()}] [AGENT] ✓ ${chalk.bold(
          agentName
        )} completed with ${messageCount} message(s)`
      )
    );
  }

  httpRequest(method: string, path: string, session?: string) {
    console.log(
      chalk.white(
        `[${this.formatTimestamp()}] [HTTP] ${chalk.bold(method)} ${path} ${
          session ? `[Session: ${session}]` : ""
        }`
      )
    );
  }

  httpResponse(
    method: string,
    path: string,
    status: number,
    duration?: number
  ) {
    const statusColor = status >= 400 ? chalk.red : chalk.green;
    console.log(
      statusColor(
        `[${this.formatTimestamp()}] [HTTP] ${method} ${path} → ${status} ${
          duration ? `(${duration}ms)` : ""
        }`
      )
    );
  }
}

export const logger = new Logger(
  process.env.LOG_LEVEL === "DEBUG" ? LogLevel.DEBUG : LogLevel.INFO
);
