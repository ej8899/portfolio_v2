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

  constructor(name: string) {
    this.name = name;
    this.level = logLevels.INFO; // Default log level
  }

  setLogLevel(level: keyof LogLevels): void {
    this.level = logLevels[level.toUpperCase() as keyof LogLevels] || logLevels.INFO;
  }

  private log(level: keyof LogLevels, message: string): void {
    if (logLevels[level] >= this.level) {
      console.log(`[${level}] [${this.name}] ${message}`);
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
export default logger;
