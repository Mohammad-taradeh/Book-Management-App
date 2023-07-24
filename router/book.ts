import express, { Request, Response, request } from "express";
import data from '../data/books.js';
const router = express.Router();

router.get('/all', (req:Request, res:Response)=>{
    
    res.json(data);
});

router.get('/:id',(req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
const book = data.find(it=> it.id===id);
res.json(book);
});

router.post('/addBook',(req:Request,res:Response)=>{
if(!req.body.id || !req.body.title)
{
    res.status(400).send({message: 'Bad request and information is required'});

}
else{
    const book = 
        {
            "id": req.body.id,
            "title": req.body.title,
            "author": req.body.author,
            "publicationYear": req.body.publicationYear
          }
    data.unshift(book);
    res.status(201).send("Book created successfully");
}
});

router.put('/update/:id',(req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    const newBook = req.body;
    const found = data.findIndex(it=> it.id===id);

    if(found === -1)
    {
        res.json({message: 'book not found'});
    }
    data[found] = {...data[found], ...newBook};
    res.json({message: 'Book updated successfully', book:data[found]});
})

router.delete('/deleteBook/:id',(req:Request,res:Response)=>{
    if(!req.params.id)
    {
        res.send("Please Enter The ID of The Book To Delete");

    }
    else {
        const id = parseInt(req.params.id.toString());
        const found = data.findIndex(it=> it.id===id);
        if(found!==-1)
        {
            data.splice(found,1);
            res.send('book deleted successfully');
        }
        
        else {
            res.send("There are no books with this id to delete");
        }
    }
});

router.get('/bookAuthor/',(req:Request,res:Response)=>{
    if(!req.query.author)
    {
        res.send("Please Enter The name of The Book To View");

    }
    else {
        const author = req.query.author;
        const book = data.find(it=> it.author===author);
        if(book)
        {res.json(book);}
        else {
            res.send("There are no books with this name to view");
        }
    }

});

router.get('/year',(req:Request, res:Response)=>{
    
    
    if(!req.query.year)
    {
        res.send("Please Enter The year of The Books To See");

    }
    else {
        
        
        const year = parseInt(req.query.year.toString());
        const book = data.filter(it=> it.publicationYear===year);
        
        if(book)
        {res.json(book);}
        else {
            res.send("There are no books with this year to view");
        }
    }
});

export default router;