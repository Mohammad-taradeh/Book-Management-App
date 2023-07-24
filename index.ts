import  express  from "express";
import data from "./data/books.js";
import bookRouter from "./router/book.js"
const port = 5000;
const app = express();

app.use(express.json())
app.use('/book', bookRouter);

app.use((req,res)=>{
    res.status(404).send("You requested something I don't have :(");
});

app.listen(port,()=>{
console.log(`App is running and listning to port: ${port}`);

});