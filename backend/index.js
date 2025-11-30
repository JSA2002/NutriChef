require('dotenv').config()
const express  = require("express");
const {connect} = require("./connect");
const cors = require('cors');
const app = express();
const {AuthConnect} = require("./AuthConnect");
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hey their!');
});

app.get('/health', (req, res) => {
  res.send('I am alright, all is well!');
});

app.get('/list', async (req, res) => {
  try {
    const collection = await connect();

    const result = await collection.aggregate([
      { $project: { _id: 0, "Dish.DishName": 1 } }
    ]).toArray();

    const dishNames = result.map(item => item.Dish.DishName);

    res.json(dishNames);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

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

/*app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const uploadedFile = req.file;
  console.log('Uploaded file:', uploadedFile);
  res.status(200).json({ message: 'File uploaded successfully' });
});*/


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

app.post('/signin', async (req, res) => {
  const result = await AuthConnect();
  const { email, password } = req.body;
  try{
    const check = await result.findOne({email:email}) 
    if(!check){
      res.json("Email Not Exists")
    }else{
      if (check.password === password) {
        // Passwords match, authentication successful
        res.json("Authentication Successful");
      } else {
        // Passwords do not match
        res.json("Incorrect Password");
      }  
    }
  }catch(e){

    }

});

app.post('/signup', async (req, res) => {
  const result = await AuthConnect();
  const { signUpPassword, signUpEmail, signUpName } = req.body;
  const user = {
    email:signUpEmail,
    password:signUpPassword,
    name:signUpName,
  }
  try{
    const check = await result.findOne({email:signUpEmail}) 
    if(check){
      res.json("Email exists")
    }else{
      const a = await result.insertMany([user], { writeConcern: { w: 'majority' } })
      res.json("createdUser");
    }
  }catch(e){
      console.log(e);
    }
});

app.listen(process.env.PORT || 5000);
