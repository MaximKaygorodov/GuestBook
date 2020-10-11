const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


function addInFile(file, newContent){
  const raw = fs.readFileSync(file, "utf8");
  const content = JSON.parse(raw);
  content.push(newContent);
  json = JSON.stringify(content);
  fs.writeFileSync(file, json);
}



app.get('/api/request_data', (req, res) => {
  const raw = fs.readFileSync("content.json", "utf8");
  const content = JSON.parse(raw);
  console.log('data responded')
  res.send(content);
});


app.get('/api/submit', (req, res) => {
  if (req.query.name && req.query.message){
    const name = req.query.name;
    const message = req.query.message;
    let newContent = {
      name: name,
      message: message
    }  
    addInFile('content.json', newContent);
  }
  const raw = fs.readFileSync("content.json", "utf8");
  const content = JSON.parse(raw);
  console.log(content)
  res.send(content);
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);