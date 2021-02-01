class Process {
    static Processor(data) {
        var row = data.split("\r\n")
        var linhas = []
        row.forEach(rows => {
            var arr = rows.split(",")
            linhas.push(arr)
        });
        return linhas
    }
}
module.exports = Process