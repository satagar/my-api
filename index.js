const express = require("express")
var app = express()
const bcrypt = require("bcryptjs");
const cors = require('cors');

// Why we need this? Check update api call
app.use(express.json())
app.use(cors());

app.get("/",function(request,response){
    response.send("Hello World!")
});

const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const User = require('./models/user.model');

/**
 * DB Connection initialization
 */
mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.DB_URL, {dbName: dbConfig.DB_NAME}).then( () => {
    console.log("connected to Mongo DB ")
    init();
}, err => {
    console.log("Error :", err.mssage)
}
);

async function init() {

    /**
     * Creating one ADMIN user at the server boot time
     */
    console.log("Dropping the user");
     await User.collection.drop();
     console.log("Creating the user");
     try {

        user = await User.create({
            name: "Satish",
            userId: "admin", // It should be atleat 16, else will throw error
            email: "satish@gmail.com",  // If we don't pass this, it will throw the error
            userType: "ADMIN",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        console.log("ADMIN user created");

    } catch (e) {
        console.log(e.message);
    }

    let client1, client2, client3 ;
    try {

        client1 = await User.create({
            name: "Client1",
            userId: "client01", // It should be atleat 16, else will throw error
            email: "Kankvish1@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        client2 = await User.create({
            name: "Client2",
            userId: "client02", // It should be atleat 16, else will throw error
            email: "Kankvish2@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        client3 = await User.create({
            name: "Client3",
            userId: "client03", // It should be atleat 16, else will throw error
            email: "Kankvish3@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        customer = await User.create({
            name: "atul01",
            userId: "atul01", // It should be atleat 16, else will throw error
            email: "Kankvish3@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CUSTOMER",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        console.log("Clients created");

    } catch (e) {
        console.log(e.message);
    }
}

require('./routes/user.routes')(app);

app.listen(10000, function () {
    console.log("Started application on port %d", 10000)
});