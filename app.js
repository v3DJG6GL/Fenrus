const http = require('http');
const express = require('express');
const homeRoutes = require('./routes/home');
const appRoutes = require('./routes/apps');
const settingsRoutes = require('./routes/settings');
const groupsRoutes = require('./routes/groups');
const groupRoutes = require('./routes/group');

const AppHelper = require('./helpers/appHelper');
const Settings = require('./models/settings')

let appHelper = AppHelper.getInstance();
appHelper.load();

let settings = Settings.getInstance();
settings.load();

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen on port 
app.listen(3000);

app.use(express.static(__dirname + '/wwwroot'));

// Calling the express.json() method for parsing
app.use(express.json());

app.use(homeRoutes);
app.use(appRoutes);
app.use(settingsRoutes);
app.use(groupsRoutes);
app.use(groupRoutes);