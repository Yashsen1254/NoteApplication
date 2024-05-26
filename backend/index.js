const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Bro!')
})

app.get('/api/auth', require('./routes/auth'))
app.get('/api/note', require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})