const express = require('express')
const app = express()
const host = 'localhost'
const port = 8080

app.get('/', (req, res) => {
    res.send("Hello from server!")
})

app.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
})
