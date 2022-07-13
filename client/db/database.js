const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/booking", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        console.log("successfull database conntected");
    })
    .catch((error) => {
        console.log(error);
    })