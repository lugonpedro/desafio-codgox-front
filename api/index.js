const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', (req, res) => {
    const db = require('./db.json');
    const { users } = db;
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.send(user);
    } else {
        res.status(401).send('Email ou password inválidos');
    }
});

app.get('/tasks/:userId', (req, res) => {
    const db = require('./db.json');
    const { tasks } = db;
    const userTasks = tasks.filter(task => task.userId == req.params.userId);
    res.send(userTasks);
});

app.post('/tasks', (req, res) => {
    const db = require('./db.json');
    const { tasks } = db;
    tasks.push({
        id: uuidv4(),
        ...req.body
    });
    fs.writeFileSync('./db.json', JSON.stringify(db));
    res.send(req.body);
});

app.put('/tasks/:id', (req, res) => {
    const db = require('./db.json');
    const { tasks } = db;
    const index = tasks.findIndex(task => task.id === req.params.id);
    tasks[index] = {
        id: req.params.id,
        ...req.body,
    }
    fs.writeFileSync('./db.json', JSON.stringify(db));
    res.send(req.body);
});

app.delete('/tasks/:id', (req, res) => {
    const db = require('./db.json');
    const { tasks } = db;
    const index = tasks.findIndex(task => task.id === req.params.id);
    tasks.splice(index, 1);
    res.send('Task deleted');
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});