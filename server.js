require("dotenv").config();
const express = require('express');
const path = require('path');
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.use('/', require('./routes/page'));

app.all('*', (req, res) => {
    res.status(404).json({ message: "Not Found" });
})

app.listen(process.env.PORT, () => console.log(`Server Started at port: ${process.env.PORT}`));