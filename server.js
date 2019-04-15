//Express Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const Routes = require('./routes.js');
const config = require('./DB');
const app = express();
const axios = require('axios');
const path = require('path');
//Production

//Socket.io uses a server instance
const server = require('http').Server(app);
//Setting up the Middleware

//Real Time Updating using SOCKET.IO
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;
module.exports.PORT = {PORT};
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Setting up DB
mongoose.Promise = global.Promise;
console.log(config.DB);
mongoose.connect(config.DB, {useNewUrlParser: true})
.then(() => console.log(`Connected to DB`))
.catch(err => console.log(err));
//Setting up Routes
app.use('/', Routes);
//Listening for events using Socket.io
  io.on('connection', function(socket) {
    console.log('connected to client123');
    let value = getData();
    // socket.on('getData', () => {
    //   console.log('received signal to get data');
      // let value = getData();
      value.then((value) => {
        console.log('sending signal with data');
        socket.broadcast.emit('gotData', { value });
      });
    })

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
      console.log('this is production');
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
    }
  async function getData() {

    let data = [];
    await axios.get(`http://localhost:${PORT}`)
    .then(res => {
      data = res.data;
    });
    console.log('Get Data was executed', data.length);
    return data;
  }

//Getting that PORT
const fs = require('fs');
fs.writeFile("./client/src/port.js", `module.exports = ${PORT}`, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(PORT);
    console.log("The file was saved!");
});

//Setting up Server
server.listen(PORT, () => console.log(`Listening at ${PORT}`));
