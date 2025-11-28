
const port = 3000
const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})