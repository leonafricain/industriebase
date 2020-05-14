const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = new express();
// middelwares 
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('hello there')
})

app.listen(3000, ()=> console.log(`server listening on port 3000`))