const express = require('express');
const app = express();

app.get("/projects",(req,res)=>{
 return res.json([
   'projeto 1',
   'projeto 2'
 ]);
})

app.post('/projects',(req,res)=>{
  return res.json([
    'projeto 1',
    'projeto 2',
    'projeto 3'
  ]);
})

app.put('/projects/:id',(req,res)=>{
  return res.json([
    'projeto 4',
    'projeto 2',
    'projeto 3'
  ]);
})


app.delete('/projects/:id',(req,res)=>{
  return res.json([
    'projeto 4',
    'projeto 2',

  ]);
})
app.listen(3333,()=>{
  console.log("A porta está rodando 🎆");
})