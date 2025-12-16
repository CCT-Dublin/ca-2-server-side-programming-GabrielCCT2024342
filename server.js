
const port = 3000

const express = require("express")
const fs = require("fs")
const csv = require("csv-parser")
const path = require("path")
const db = require("./database")
const validate = require("./validation")
const regExs = validate.regExs
const validation = validate.validation
const fullValidation = validate.fullValidation

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
    .on("error", (err, row) => {
        console.error("Error: ", err.message, " on row ", row)
    })

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + "/views"))


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/form", (req, res) => {
    res.render("form.ejs")
})

app.post("/form", (req, res) => {
    const {fname, lname, email, pnumber, eircode} = req.body

    if(fullValidation(fname,lname, email, pnumber, eircode)){
        try {
            db.query(
                "INSERT INTO user_data VALUES (?, ?, ?, ?, ?)",
                [fname, lname, email, pnumber, eircode]
            )   

            console.log("All good")

        }catch (err) {
            res.status(500).send("Database error")
        }
        
        res.render(path.join(__dirname, "views", "success.ejs"))
    } else{
        res.render(path.join(__dirname, "views", "form.ejs"))
    }

    
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
