
const port = 3000

const express = require("express")
const fs = require("fs")
const csv = require("csv-parser")

const filePath = "person_info.csv"
const firstNames = []
const lastNames = []
const emails = []
const ages = []

const app = express()
const stream = fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
        firstNames.push(row.first_name)
        lastNames.push(row.last_name)
        emails.push(row.email)
        ages.push(parseInt(row.age))
    })
    .on("end", () => {
        console.log("Reading done")
    })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})