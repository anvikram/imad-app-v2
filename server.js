var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require ('pg').Pool;
var crypto=require ('crypto');

var config = {
    
    user:'anvikram',
    database:'anvikram',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
}
var app = express();
app.use(morgan('combined'));

var names=[];




function createTemplate(data)
{

var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;
var htmlTemplate = `

<html>
    
    <head>
        <title>
            ${title}
        </title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
     <link href="/ui/style.css" rel="stylesheet" />
    </head>
   
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
          ${heading}
        </h3>
        <div>
           ${date.toDate}
        </div>
        <div>
           ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}


var pool=new Pool(config);
app.get('/test-db',function(req,res)
{

pool.query('SELECT * from test',function(err,result)
{
if(err){
    res.status(500).send(err.toString());
}
else
{
    res.send(JSON.stringify(result));
}
});
});

var counter=0;
app.get('/counter',function(req,res)
{
 counter=counter+1;
 res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/submit-name', function (req, res) {
 var name=req.query.name;
 names.push(name);
 res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    //var articleName=req.params.articleName;
  //res.send(createTemplate(articles[articleName]));
  
  pool.query("SELECT * FROM article1 WHERE title = $1",[req.params.articleName],function(err,result){
      if(err){
    res.status(500).send(err.toString());
}
else
{
    if(result.rows.length===0)
    {
        res.status(404).send("Article not found");
    }
    else
    {
     var articleData=result.rows[0];
     res.send(createTemplate(articleData));
    }
}
  });
  
  
});

function hash (input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input', function (req, res) {
  var hashedString=hash(req.params.input,'random string');
  res.send(hashedString);
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
