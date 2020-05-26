const { PdfDoc } = require('../models')

const ctrl = {}

ctrl.createPdf = async (req, res) => {
    try {
    const pdfdoc = await PdfDoc.create({
        doctype: req.body.doctype,
        expediteur: req.body.expediteur,
        subject: req.body.subject,
        pdfname: req.file.pdfname
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

ctrl.getOnePdf = async(req, res) => {

  try {
    const pdf = await PdfDoc.findByPk(req.params.pdfId);
    
  if (pdf === null) {
    console.log('Not found!');
    res.status(404).send({
      message: `document not found`
    })
  } else {
    console.log(pdf instanceof PdfDoc); // true
    res.status(200).send({
      pdf: pdf
    })
  }
    
  } catch (error) {
    res.status(500).send({
      message: `erreur => ${error}`
    })
  }
}

ctrl.getAllPdf = async (req, res) => {
  try {
    const pdfs = await PdfDoc.findAll();

    if (pdfs === null) {
      console.log('Not found!');
      res.status(404).send({
        message: `document not found`
      })
    } else {
      res.status(200).send({
        pdfs: pdfs
      })
    }
  } catch (error) {
    res.status(500).send({
      message: `error was  => ${error}`
    })
  }
}

module.exports = ctrl
