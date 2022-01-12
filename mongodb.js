const express=require('express');
const xlsx=require('xlsx')
const MongoClient=require('mongodb').MongoClient;


const app=express();
app.use(express.json())
var database
app.get('/',(req,res)=>{
    res.send('welcome to mongodb Api')
})
let arr=[]
app.get('/getdata',(req,res)=>{
    database.collection('kyc_status').find({}).toArray((err,result)=>{
        if(err) throw err
        // console.log(result);
        // exportToCSV(result)
     const wb=xlsx.utils.book_new();
    const ws=xlsx.utils.json_to_sheet(result);
    xlsx.utils.book_append_sheet(wb,ws);
    xlsx.writeFile(wb,"Details.xlsx");

// const workBook = xlsx.readFile(Details);
// xlsx.writeFile(workBook, outputFilename, { bookType: "csv" });
        res.send(result)
    })
})



app.listen('8080',()=>{
    MongoClient.connect('mongodb+srv://test:test@cluster0.xkyv9.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-pj8xb4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',{
        useNewUrlParser:true
    },(error,result)=>{
        if(error) throw error
        database=result.db('kyc')
        console.log('connection succesful')
    })
})
