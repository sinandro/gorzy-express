const express = require("express")
const app = express()
const path = require("path")

const PORT = 3669

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
  .get('/api/', function (req, res) {
    res.json({ hi: 'eh' })
  })

app.listen(PORT, function () {
  console.log('listening on port ' + PORT)
})