const express = require("express");
const test = require("./router/test");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",test);

const port = 5000;
app.listen(port, () => console.log(`${port}`));