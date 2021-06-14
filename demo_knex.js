let express = require("express")
let app = express()
let bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
let port = 5000; 

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'Neha@1234',
      database : 'userDetails'
    }
});


knex.schema.hasTable("users").then((data) => {
    if (!data){
        return knex.schema.createTable("users" , (table) => {
            table.increments("id").primary()
            table.string("name"),
            table.string("email"),
            table.integer("mobile")
            table.integer("age")
        })
    }
})

app.post("/create" , (req,res) =>{
    knex('users')
        .insert({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            age: req.body.age
        })
        .then(() => {
            console.log("inserted")
            res.send("inserted")
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })

})

app.listen(port, () => {
    console.log(`server is running on your ${port}` )
})