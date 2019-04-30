const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"}
];
app.get('/',(req,resp)=>{
    resp.send('Hello World');
});

app.get('/api/courses',(req,resp)=>{
    resp.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given was not found')
    res.send(course)
});


app.post('/api/courses',(req,res)=>{

    const {error } = validateCourse(req.body);

    if(error){
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message)
        return;
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
//Look up the course
const course =  courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send('The course with the given was not found');
//If not existing, return 404

const {error } = validateCourse(req.body);

if(error){
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return;
}

//Update the course
course.name = req.body.name;

//Return the update course
resp.send(course);
});
//PORT 
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}.....` ));


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}