const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const { data } = require('./data.json');
const { projects } = data;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.locals = data.projects;
    res.render('index');
});

app.get('/about', (req, res) => {
    res.locals = data.projects;
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const projectData = projects[id]
    const name = projects[id].project_name;
    const des = projects[id].description;
    console.log(projectData);
    res.render('project', projectData);

});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});