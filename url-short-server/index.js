//setup express server 


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const urlRoutes = require('./routes/url-routes')

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/' , urlRoutes)

//catch-all route to handle undefined endpoints
app.all("*" , (req , res) => {
  res.status(404).json({error : "Route not found"})
})

//database connection setup 
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    // console.log("mongodb connected");

    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("DB error", err);
  }
};

// app.get("/" , (req , res) => {
//     res.send("welcome")
// })

connectDB();