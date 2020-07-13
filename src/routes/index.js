const express = require('express');
const { response } = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (request, response) => {    
    const tasks = await Task.find();
    // console.log(tasks);
    // send taks object to the view
    response.render('index', {tasks});
});

router.post('/add', async (request, response) => {
    const task = new Task(request.body);
    await task.save();
    response.redirect('/');
});

router.get('/complete/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('update', {task});
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;

    // first parameter: id to look for on database
    // second parameter: body of request, where mongoose is
    // going to take the new value for the id
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    console.log('params: ', req.params);
    const { id } = req.params;
    console.log('id to delete: ', id);
    await Task.deleteOne({_id: id});
    res.redirect('/');
});

module.exports = router;