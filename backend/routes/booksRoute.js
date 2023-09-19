import express from "express";
import { Book } from "../models/bookModel.js";
const router =express.Router();

router.post('/',async(request,response)=>{
    try {
        if (!request.body.title || !request.body.author ||!request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fildes: title. author, publishYear',
            });
        }
        const newBook={
            title:request.body.title ,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book =await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
// route for get Books from data base
router.get('/',async(request,response)=>{
try {
    const books=await Book.find({})
    return response.status(200).send({
        count:books.length,
        data:books
    });
} catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
}
});
// Route for get One Book From database by id 
router.get('/:id',async(request,response)=>{
try {
    const {id} =request.params;
    const book=await Book.findById(id)
    return response.status(200).send(book);
} catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
}
});
// Route for edit books
router.put('/:id',async(request,response)=>{
    try {
        if (!request.body.title || !request.body.author ||!request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fildes: title. author, publishYear',
            });
        }
        const {id} =request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if (!result) {
            return response.status(404).json({message:'book not found'});
        }
        return response.status(200).json({message:'book updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }
});
// Route for delete books
router.delete('/:id', async(request,response)=>{
    try {
        const {id} =request.params;
        const result=await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({message:'book not found'});
        }
        return response.status(200).json({message:'book Deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }
});

export default router;