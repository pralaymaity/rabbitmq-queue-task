const xlsx = require("xlsx");
const queueService = require("./queue");

async function processExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  for (let row of rows) {
    await queueService.sendToQueue(row);
  }

  return rows.length;
}

module.exports = {
  processExcel,
};
