var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var mustache = require ('mustache-express');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.engine('mustache', mustache());

app.set('views', './views');
app.set('view engine', 'mustache');

app.use(session({secret: 'securesession'}))


app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

app.get('/todo', function(req, res) { 
    res.render('list.mustache', {todolist: req.session.todolist});
})

app.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

app.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

app.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(3000);