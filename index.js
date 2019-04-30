const express = require('express');
const app = express();
//Hello World 
app.get('/',(req,resp)=>{
    resp.send('Hello World');
});

app.get('/api/courses',(req,resp)=>{
    resp.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

//PORT 
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}.....` ));
