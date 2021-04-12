const express=require('express');

const app=express();
const path = require('path');
let port=3000;

const erro404= function(req,res,next)
{
    res.send("Você esta acessando um link inválido ou inexistente: ERRO 404");
    next();
}

const mongoose = require('mongoose');
const db_access = require('./setup/db').mongoURL;

mongoose
.connect(db_access, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("conexao ao banco de dados feita com exito"))
.catch(err=>console.log(err));

const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extend:false}));
app.use(bodyparser.json());

const auth=require("./routes/auth");
app.use("/auth", auth);

app.set('view engine','pug');
app.set('views', path.join(__dirname,"views"));

app.get('/', (req,res)=>
{
    res.render("comentario");  
});

app.use('*', erro404);

app.listen(port,()=> console.log(`Aguardando na porta: ${port}`));