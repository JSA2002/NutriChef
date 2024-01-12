require('dotenv').config()
const express  = require("express");
const {connect} = require("./connect");
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.get("/name",async (req, res)=>{
    const result = await connect();
      const results = await result.aggregate([
       {
          $match: 
                { "Dish.DishName": { $regex: new RegExp(req.query.searchTerm, 'i') } },   
       }
    ]) 

    res.send(results)
})

app.get("/name/:dishname",async (req, res)=>{
  const result = await connect();
    const results = await result.aggregate([
     {
        $match: { "Dish.DishName": req.params.dishname },   
     }
  ]) 

  if (results.length === 1) {
    res.send(results[0]);
  } 
})

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const uploadedFile = req.file;
  console.log('Uploaded file:', uploadedFile);
  res.status(200).json({ message: 'File uploaded successfully' });
});


app.post('/camera', (req, res) => {
  const imageBuffer = req.file.buffer; // Get the uploaded image as a buffer
  console.log("image:", imageBuffer)
  res.send('Image uploaded successfully');

});


app.post('/ingredient', async (req, res) => {
  const { selectedIngredients } = req.body;
  console.log(selectedIngredients)
  const result = await connect();
      const results = await result.aggregate([
       {
          $match: 
                { "Dish.Ingredients": { $all: selectedIngredients } },   
       }
    ]) 

    res.send(results)
});

app.listen(process.env.PORT || 5000);
