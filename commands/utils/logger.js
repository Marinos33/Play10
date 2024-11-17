const path = require('node:path');
const fs = require('node:fs');

function writeToLogFile(logString) {
  const date = new Date();
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const logFolderPath = path.join(__dirname, '..', '..', 'logs');

  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  const logFileName = `log - ${dateString}.txt`;
  const logFilePath = path.join(logFolderPath, logFileName);

  const existingLogs = fs.existsSync(logFilePath)
    ? fs.readFileSync(logFilePath, 'utf8')
    : '';
  const newContent = `[${getFormattedTime(
    date,
  )}] ${logString}\n${existingLogs}`;

  fs.writeFileSync(logFilePath, newContent);
}

function writeErrorToLogFile(logString) {
  const date = new Date();
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const logFolderPath = path.join(__dirname, '..', '..', 'logs');

  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  const logFileName = `error log - ${dateString}.txt`;
  const logFilePath = path.join(logFolderPath, logFileName);

  const existingLogs = fs.existsSync(logFilePath)
    ? fs.readFileSync(logFilePath, 'utf8')
    : '';

  const newContent = `[${getFormattedTime(
    date,
  )}] ${logString}\n${existingLogs}`;

  fs.writeFileSync(logFilePath, newContent);
}

function getFormattedTime(date) {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

module.exports = { writeToLogFile, writeErrorToLogFile };
