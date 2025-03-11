const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectedDB");
const router = require("./routes/userRoute");
dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [  
    "https://100xalumni-fe.vercel.app",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"], 
    allowedHeaders: ["Content-Type", "Authorization", "token"], 
    credentials: true,
  };

app.use(cors(corsOptions));
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    try {
        return res.status(200).send("Backend Working Properly");
    } catch (error) {
        return res.status(500).send("Backend not Working: " + error.message);
    }
})
app.use(cookieParser());
app.use("/api/user", router);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });


module.exports = app;
