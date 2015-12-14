'use strict';
var externAppsFunctions = externAppsFunctions || {};

function fillCalendarCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // keeping this around just incase I need to turn back on displaying all returns from DB
    var dataStr = JSON.stringify(data, null, 4);

    var oneThing = data[0];
    var size = data.length;
    for (var i = 0; i < data.length; i++)
        externAppsFunctions.addCalendarEvent(data[i]["date"],data[i]["userName"],data[i]["description"],data[i]["time"]);

  };

function generalCallback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    // keeping this around just incase I need to turn back on displaying all returns from DB
    var dataStr = JSON.stringify(data, null, 4);

  };

var api = {
  url: 'http://localhost:3000',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },
  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/signup',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
      // dataType: 'json'
    }, callback);
  },
  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials)
    }, callback);
  },

  getCalendar: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/appointment',
    }, callback);
  },

  createAppointment: function(appointmentData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/appointment/makenew',
      contentType: 'application/json',
      data: JSON.stringify(appointmentData)
    }, callback);
  },





  createSurvey: function(surveyData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/survey/makenew',
      contentType: 'application/json',
      data: JSON.stringify(surveyData)
    }, callback);
  },
  loadSurvey: function(surveyURL, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/survey' + surveyURL,
      contentType: 'application/json',
      dataType: 'json'
    }, callback);
  },
  createResult: function(surveyData, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/result/makenew',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(surveyData)
    }, callback);
  },
  updateResult: function(surveyData, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/result/update',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(surveyData)
    }, callback);
  },
  getResults: function (surveyName, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/result?q=' + surveyName,
      dataType: 'json'
    }, callback);
  },

  deleteResults: function (surveyName, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/result/destroy?q=' + surveyName,
    }, callback);
  },

  deleteSurvey: function (surveyName, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/survey/destroy?q=' + surveyName,
    }, callback);
  },
};
