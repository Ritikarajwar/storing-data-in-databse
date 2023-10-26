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

let data

app.post("/newentry",express.json(),async (req,res)=>{
    // res.json(details)
    // let info= await db.collection('players').find().toArray()
    let details =  req.body
    // console.log(details)
    // let j=0;
    // data = await db.collection('players').find().toArray()
    // console.log(data)
//     for(let i=0;i<data.length;i++){
//         if(data[i].details.adhar_no==details)
//         console.log('data existed')
//     else 
//     console.log('can be added')
//     // j=i
//     }
//     if(i == data.length-1)
//     console.log('HELLO')

    data = await db.collection('players').insertOne({details})
    res.send(data)
    

}
)


app.get("/newentry",express.json(),async(req,res)=>{
    let info= await db.collection('players').find().toArray()
    res.send(info)
})




connection 
.then((client)=>{
    db=client.db(dbName)
    app.listen(port,()=>console.log("server started at port "+ port))
})