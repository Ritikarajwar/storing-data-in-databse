import express from "express"
import cors from "cors"
import connection from "./connection.js"
import { dbName } from "./connection.js"

const app = express()
const port = 8084 
let db;

app.use(express.json())
app.use(cors({origin:"http://127.0.0.1:5500"}))

app.options("/newentry",(req,res)=>{
    res.header("Access-Control-Allow-Methods","POST")
    res.sendStatus(200)
})



app.post("/newentry",express.json(),async (req,res)=>{
    let details =  req.body
    let data = await db.collection('players').insertOne({details})
    // res.send(data)
    
    // res.json(details)
    let existingPlayer= await db.collection('players').find({details}).toArray()
    let adhar=req.body.adhar_no
    
    console.log(existingPlayer.details)
    console.log(adhar)
    res.send(existingPlayer)
//     for(let i=0;i<existingPlayer.length;i++){
        
//         if(existingPlayer[i].details.adhar_no==adhar)
//         console.log('data existed')
//     else
//     console.log('data can be added')
// checkdata()
// }
// res.send(existingPlayer[0].details)
// function checkdata(){
    // }


})



app.get("/newentry",express.json(),async(req,res)=>{
    let info= await db.collection('players').find().toArray()
    res.send(info)
})




connection 
.then((client)=>{
    db=client.db(dbName)
    app.listen(port,()=>console.log("server started at port "+ port))
})