const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const multer = require('multer');
// app
const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer ({ storage: fileStorageEngine });


// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.post("/single", upload.single("image"), (req,res) => {
  console.log(req.file);
  res.send("Single File upload success");
});
// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./frontend/build'));

  app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname , 'frontend', 'build', 'index.html'));

  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));