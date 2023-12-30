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

  private serverSend: boolean;

  private serverUrl: string;

  constructor(name: string, serverUrl = 'http://erniejohnson.ca/logger/log.py') {
    this.name = name;
    this.level = logLevels.INFO; // Default log level
    this.consoleOutput = true; // show log messages in console?
    this.serverSend = true; // send logMessage to server for actual logging
    this.serverUrl = serverUrl;
  }

  setLogLevel(level: keyof LogLevels): void {
    this.level = logLevels[level.toUpperCase() as keyof LogLevels] || logLevels.INFO;
  }

  toggleConsoleLog(shouldLog: boolean): void {
    this.consoleOutput = shouldLog;
  }

  private getEnvironmentInfo(): { browser: string; version: string; os: string; device: string } {
    const userAgent = window.navigator.userAgent;
    const browserData = this.parseUserAgent(userAgent);

    return {
      browser: browserData.browserName,
      version: browserData.browserVersion,
      os: window.navigator.platform,
      device: this.getDeviceType(),
    };
  }

  private parseUserAgent(userAgent: string): { browserName: string; browserVersion: string } {
    const match = userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    const [, browserName, browserVersion] = match;

    return { browserName, browserVersion };
  }

  private getDeviceType(): string {
    const isMobile = /Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent,
    );
    return isMobile ? 'Mobile' : 'Desktop';
  }

  private getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  private log(level: string, message: string): void {
    const logMessage = `[${level}] [${this.name}] ${message}`;
    const formattedLog = `[${new Date().toISOString()}] ${logMessage}`;
    const environment = this.getEnvironmentInfo();

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

      // dump to server:
      if (this.serverSend) {
        const userId = this.getUserId();
        console.log({
          date: new Date().toISOString(),
          message: logMessage,
          userId,
          environment,
        });
        // this.sendLogToServer({
        //   date: new Date().toISOString(),
        //   message: logMessage,
        //   userId,
        //   environment,
        // }).catch((error) => {
        //   console.error('Error while sending log to server:', error);
        // });
      }
    }
  }

  private async sendLogToServer(logData: {
    date: string;
    log: string;
    environment: unknown;
    userId?: string;
  }): Promise<void> {
    try {
      const response = await fetch(this.serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logData }),
      });

      if (!response.ok) {
        console.error('Failed to send log to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error while sending log to server:', error);
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
