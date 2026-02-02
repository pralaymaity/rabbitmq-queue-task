const uploadService = require("../service/upload");

async function uploadExcel(req, res) {
  try {
    const totalRows = await uploadService.processExcel(req.file.path);

    res.json({
      message: "Excel accepted. Processing in background.",
      totalRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  uploadExcel,
};
