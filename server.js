const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Lifecycle = require('./lifecycle');
const app = express();
let event = [];
app.use(bodyParser.json());
Lifecycle.handleConfig(event);
app.post('/', function(req, resp) {
    let evt = req.body;
    let lifecycle = evt.lifecycle;
  
    switch(lifecycle) {
      case 'CONFIGURATION': {
        let res = Lifecycle.handleConfig(evt.configurationData);
        response.json({statusCode: 200, configurationData: res});
        break;
      }
      case 'INSTALL': {
        handleInstall(evt.installData.installedApp, evt.installData.authToken);
        resp.json({statusCode: 200, installData: {}});
        break;
      }  
    }
  });




  const PORT = process.env.PORT || 3001;

  app.listen(PORT , function() {
    console.log('App is running!');
  });