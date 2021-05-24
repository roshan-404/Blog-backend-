import express from "express"
import mongoose from "mongoose"
import Blogs from "./dbblogs.js"
import Cors from "cors"


// App config 
const app = express();
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://admin:dviperrko@cluster0.cuadk.mongodb.net/blogdb?retryWrites=true&w=majority`

// Middlewares  
app.use(express.json())
app.use(Cors())

// DB config 
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})


// API EndPoints 
app.get('/',(req , res) => res.status(200).send("HELLO PEOPLE"))

app.post('/blogs', (req, res) => {
    const dbblogs = req.body;

    Blogs.create(dbblogs, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


app.get('/blogs', (req, res) => {

    Blogs.find( (err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
} )

app.get("/:id", (req, res) => {
    Blogs.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id
        });
      }
      res.status(200).send(data);
      console.log(data);
    })
    .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving data with id " + req.params.id,
        });
      }) 
    
});

// Listner 
app.listen(port, ()=> console.log(`listening to localhost: ${port} `));

