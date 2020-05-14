const express = require('express');

const app = new express();

app.listen(3000, ()=> console.log(`server listening on port 3000`))