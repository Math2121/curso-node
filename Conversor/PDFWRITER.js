var pdf = require('html-pdf')
class Pdf {
    static writePdf(file, html) {
        pdf.create(html,{}).toFile(file,(err)=>{
            
        })
    }
}
module.exports = Pdf