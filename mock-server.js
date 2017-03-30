const appPref = require('./mockFixtures/app_pref.json'),
userPref = require('./mockFixtures/user_pref.json'),
dataRefresh = require('./mockFixtures/data_refresh_time.json');


const mockServer = (app) => {
    app.get('/KeyNoteService/services/mailKeynote', function(req, res) {
        res.send('Hello World!');
    });
    app.get('/gsf/<appname>/preferences', function(req, res) {
        res.send(appPref);
    });
    app.get('/gsf/<appname>/user/preferences', function(req, res) {
        res.send(userPref);
    });
    app.get('/..../services/dataRefreshTime', function(req, res) {
        res.send(dataRefresh);
    });
}
module.exports = mockServer;
