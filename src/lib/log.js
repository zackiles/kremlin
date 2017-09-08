import winston from 'winston';

const logConfig = {
  transports: [],
};

logConfig.transports.push(new (winston.transports.Console)({
  level: 'silly',
  handleExceptions: true,
  prettyPrint: true,
  timestamp: true,
  colorize: true,
  json: false,
  silent: process.env === 'test',
}));

winston.addColors({
  debug: 'green',
  info: 'cyan',
  silly: 'purple',
  trace: 'magenta',
  verbose: 'magenta',
  warn: 'yellow',
  warning: 'yellow',
  error: 'red',
});

const log = new winston.Logger(logConfig);

export default log;
