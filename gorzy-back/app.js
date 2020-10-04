const express = require("express")
const app = express()
var cors = require('cors')
const path = require("path")

const PORT = 3669

app.use(cors({ origin: true }))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
  .get('/api/', function (req, res) {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader('Access-Control-Allow-Methods', '*');
    // res.setHeader("Access-Control-Allow-Headers", "*");
    // res.setHeader("Content-Type", "application/json");
    res.json({ hi: 'eh' })
  })

app.listen(PORT, function () {
  console.log('listening on port ' + PORT)
})