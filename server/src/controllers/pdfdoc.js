const { PdfDoc } = require('../models')

const ctrl = {}


ctrl.createPdf = async (req, res) => {
    try {
    const pdfdoc = await PdfDoc.create({
        doctype: req.body.doctype,
        expediteur: req.body.expediteur,
        subject: req.body.subject,
        dateIn: req.body.dateIn,
        pdfname: req.file.filename
    });
    
    res.status(201).send({
      pdf: pdfdoc
    });

  } catch (error) {
    res.status(400).send({
      message: `erreur lors de la création du docuement`,
      error: error
    })
  }

}

module.exports = ctrl
