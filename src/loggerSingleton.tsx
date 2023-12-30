//
// Data logging system
//

interface LogLevels {
  TRACE: number;
  DEBUG: number;
  INFO: number;
  WARN: number;
  ERROR: number;
  FATAL: number;
}

const logLevels: LogLevels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5,
};

class Logger {
  private name: string;

  private level: number;

  private consoleOutput: boolean;

  constructor(name: string) {
    this.name = name;
    this.level = logLevels.INFO; // Default log level
    this.consoleOutput = true; // show log messages in console?
  }

  setLogLevel(level: keyof LogLevels): void {
    this.level = logLevels[level.toUpperCase() as keyof LogLevels] || logLevels.INFO;
  }

  toggleConsoleLog(shouldLog: boolean): void {
    this.consoleOutput = shouldLog;
  }

  private log(level: string, message: string): void {
    const logMessage = `[${level}] [${this.name}] ${message}`;
    if (this.consoleOutput) {
      switch (level) {
        case 'TRACE':
          console.log('\x1b[36m%s\x1b[0m', logMessage); // Cyan
          break;
        case 'DEBUG':
          console.log('\x1b[32m%s\x1b[0m', logMessage); // Green
          break;
        case 'INFO':
          console.log('\x1b[34m%s\x1b[0m', logMessage); // Blue
          break;
        case 'WARN':
          console.log('\x1b[33m%s\x1b[0m', logMessage); // Yellow
          break;
        case 'ERROR':
          console.log('\x1b[31m%s\x1b[0m', logMessage); // Red
          break;
        case 'FATAL':
          console.log('\x1b[41m%s\x1b[0m', logMessage); // Background Red
          break;
        default:
          console.log(logMessage);
      }
    }
  }

  trace(message: string): void {
    this.log('TRACE', message);
  }

  debug(message: string): void {
    this.log('DEBUG', message);
  }

  info(message: string): void {
    this.log('INFO', message);
  }

  warn(message: string): void {
    this.log('WARN', message);
  }

  error(message: string): void {
    this.log('ERROR', message);
  }

  fatal(message: string): void {
    this.log('FATAL', message);
  }
}

const logger = new Logger('EJCA');
logger.toggleConsoleLog(true);
export default logger;
