require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.pyzlb.mongodb.net/mern?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json()); // để đọc được tất cả những gì gửi đi bằng json
app.use("/api/auth", authRouter);
const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
