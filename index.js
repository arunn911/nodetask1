const express = require("express")
const fs = require("fs")
const moment = require("moment")
const path = require('path');
const app = express();
const PORT = 8080;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`)
})

const directoryPath = path.join(__dirname, 'public');



 // end point to create a text file

app.post("/", (req, res) => {
    // let fileName = moment(Date.now()).format('DD-hh-mm-ss')
    // let fileContent = Date.now().toString();
   try {
    fs.writeFile(`./public/${moment(Date.now()).format('DD-hh-mm-ss')}.txt`, Date.now().toString(), (err) => {
        if(err) {    console.log(err)   }
        else{   console.log("File created ...") }
    })
    res.send("File created")
   }
   catch{
    res.send("File is not created")
   }
})


   // endpoint to reterive all the files 

app.get("/files", (req, res) => {
  try{
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        // no err send files
       res.send(files)
    });
  }
  catch{
     res.status(500).send("Something went wrong")
  }
})

