module.exports = (sequelize, DataTypes) => {
    const PdfDoc = sequelize.define('PdfDoc', {
        doctype: DataTypes.STRING,
        expediteur: DataTypes.STRING,
        subject: DataTypes.STRING,
        pdfname: DataTypes.STRING,
    }, {});
    PdfDoc.associate = function(models) {
      // associations can be defined here
    };
    
    return PdfDoc;
  };
  
  