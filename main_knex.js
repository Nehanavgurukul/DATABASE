const express = require ("express")
const app = express()
const bodyparser = require ("body-parser")
app.use(bodyparser.urlencoded({extended :false }))
app.use(bodyparser.json())
const port = 8000;


const knex = require ("knex")({
    client :"mysql",
    connection :{
       host:"localhost" ,
       user: "root",
       password: "Neha@1234",
       database: "myDetails" 
    }
})


knex.schema.hasTable("marriagedetails").then((data1)=>{
    if(!data1){
      return knex.schema.createTable("marriagedetails", (table) =>{
            table.increments("id").primary()
            table.string("name")
            table.string("lastname")
            table.integer("age")
        })
    }
})


app.post("/create" , (req, res) =>{
    knex("marriagedetails")
    .insert({
        name:req.body.name,
        lastname:req.body.lastname,
        age:req.body.age
    })
    .then(()=>{
        console.log("inserted")
        res.send("inserted")
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })

})


app.get("/dataget" , (req, res) => {
    knex().select("*").from("marriagedetails").then((data) => {
        res.send(data)
        console.log(data);

    }).catch((err) => {
        res.send(err)
        console.log(err);
    })
    
})

app.get("/Iddata/:id" ,(req, res)=>{
    knex()
        .select("*")
        .from("marriagedetails")
        .where("id", req.params.id)
        .then((result)=>{
                res.json(result)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })

});


app.put('/update/:id',(req,res) => {
    knex.update({
        "name": req.body.name,
        "lastname": req.body.lastname,
        "age": req.body.age
    })
    .table("marriagedetails").where('id',req.params.id)
    .then(() => {
        res.send('data updating....')
    })
    .catch((err) => {
        res.send(err)
    })
})


app.delete("/deletedata/:id", (req, res) => {
    knex()
    .delete({
        name:req.body.name,
        lastname:req.body.lastname,
        age:req.body.age
    })
    .table("marriagedetails").where("id", req.params.id)
    .then(() => {
        res.send("deleted data.....")
    })
    .catch((err) => {
        res.send(err)
    })
})


app.listen(port ,()=>{
    console.log(`server is running on port ${port}`)
})




