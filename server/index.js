const express = require("express")
const cors = require("cors")
const multer = require("multer");


const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")

const { connection } = require("./config/db")
const { authentication } = require("./middlewares/authentication")
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 8080          

app.use(express.json())  
app.use(cors());    
  
app.get("/", (req, res) => {
    res.send("notes home page")
})


app.use("/", userController)
app.use(authentication)  
app.use("/", notesController)   

//upload pdf using multer
const pdf = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/aadhar/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
      filePath: function (req, file, cb) {
        cb(null, file.path.replace(/\\/g, "/"));
      },
    }),
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only pdf files are allowed!"));
      }
      cb(null, true);
    },
});

// upload pdf api
app.post("/uploadpdf", pdf.single("file"), async (req, res) => {
    const file = req.file;
    const filePath = file.path;
    if (file) {
      res
        .status(200)
        .send({ message: "File uploaded successfully", data: filePath });
    } else {
      res.status(404).send({ message: "File Not Uploaded" });
    }
});


app.post("/uploadpdfdocs", pdf.single("file"), async (req, res) => {
    let file = req.file;
    let filePath = file.path;
    filePath = filePath.replace(/\\/g, "/");
    const url = `http://localhost:3000/${filePath}`;   // # REACT_APP_API_URL=http://43.205.231.180:3000
    let pdfArray = await pdf2img.convert(filePath);
    //console.log('saving images');
    let imagepath = await convertPDF2Image(pdfArray);
    res.status(200).send({
      message: "File uploaded successfully",
      imageData: imagepath,
      url: url,
    });
});
  
   
app.listen(PORT, async ()=> {    
    try {
        await connection;
        console.log("connected to DB")
    } catch (err) {
        console.log("not connected to db")    
        console.log(err)
    }
    console.log(`listning on PORT ${PORT}`)
})