const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Bro!')
})

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})