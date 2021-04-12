const express=require('express');
const router=express.Router();

const Pessoa=require("../models/pessoa");
const bcrypt=require("bcrypt");

router.post('/',(req,res)=>{
Pessoa.findOne({user: req.body.usuario, email: req.body.email, comentario: req.body.coments})
.then(doc_pessoa =>{
    if (doc_pessoa){
        return res.status(400).send("Erro: Comentario ja foi registrado, tente inserir novamente");

    }else{
        const novo_registro_pessoa=Pessoa({
            user: req.body.usuario,
            email:req.body.email,
            comentario:req.body.coments,
            senha: req.body.pass,
        });

        bcrypt.genSalt(10, function (err,salt){
            bcrypt.hash(novo_registro_pessoa.senha, salt, function(err,hash)
            {
                if (err) throw err;
                
                novo_registro_pessoa.senha=hash;
                novo_registro_pessoa
                .save()
                .then(p=> res.json(p))
                .catch(err=>console.log(err));
                res.status(200).send("Comentario salvo com sucesso");
            });
        });
       
    }
})
.catch(err=>console.log(err));
});
module.exports=router;
