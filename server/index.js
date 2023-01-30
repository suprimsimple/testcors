const apiConfig = require("./api");
const express = require('express')
const app = express()
const port = 3001


app.get('/', (req, res) => {
  res.send('BSSA Api Prototype!')
})

for (let [route, cb] of apiConfig) {
  app.get(route, cb);
}

app.listen(port, () => {
  console.log(`BSSA api prototype available at http://localhost:${port}`)
})