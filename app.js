const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { data } = require('./data.json');
const { projects } = data;

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.locals.projects = data.projects;
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const projectData = projects[id]
    res.render('project', projectData);

});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.locals.error = err;
    res.render('page-not-found', err);
  });
  
  app.use((err, req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    res.locals.error = error;
    res.status(error.status);
    res.render('error');
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});