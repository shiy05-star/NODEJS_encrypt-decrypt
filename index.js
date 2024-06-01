const express = require("express");
const bodyParser= require("body-parser");
const dbConn = require("./config/dbConfigure");
const userRoutes = require("./src/routes/userRoutes");


const app =express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use('/api/v2/',userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
 
 });

