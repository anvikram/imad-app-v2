var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
articleOne:{
    title:"Article One : Android",
    heading: "Article One",
    date: "25Mar17",
    content:
            `<p>
                This is the first paragraph regarding android
            </p>
            <p>
                This is the second paragraph regarding android
            </p>
            <p>
                This is the third paragraph regarding android
          </p>`
},
articleTwo:{
    title:"Article Two : iOS",
    heading: "Article Two",
    date: "25Mar17",
    content:
            `<p>
                This is the first paragraph regarding iOS
            </p>
            <p>
                This is the second paragraph regarding iOS
            </p>
            <p>
                This is the third paragraph regarding iOs
          </p>`
},
articleThree:{
      title:"Article Two : Windows Mobile",
    heading: "Article Three",
    date: "25Mar17",
    content:
            `<p>
                This is the first paragraph regarding Windows Mobile
            </p>
            <p>
                This is the second paragraph regarding Windows Mobile
            </p>
            <p>
                This is the third paragraph regarding Windows Mobile
          </p>`
},
    
}

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
           ${date}
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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/:articleName', function (req, res) {
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
