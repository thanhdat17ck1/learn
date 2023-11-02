const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const productRouter = require("./controller/product");
const categoryRouter = require("./controller/category");
const infoAccountRouter = require("./controller/infoAccount");
const userRouter = require("./controller/user");

app.use(express.json());

//routes
app.use("/", productRouter);
app.use("/", categoryRouter);
app.use("/", infoAccountRouter);
app.use("/", userRouter);


mongoose
    .connect(
        "mongodb+srv://dat708710:0938681436z@facebook.fovmbte.mongodb.net/facebook-dev?retryWrites=true&w=majority"
    )
    .then(() =>
        app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
        })
    )
    .catch((err) => {
        console.log(err);
});
