const fs = require("fs")
const util = require("util")

class Writer{

    constructor(){
        this.writer = util.promisify(fs.writeFile)
    }

    async Writer(file,data){
        try{
            await this.writer(file,data)
            return true
        }catch(err){
            console.log(err)
        }
    

    }
}
module.exports = Writer