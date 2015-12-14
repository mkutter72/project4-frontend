'use strict';

var externAppsFunctions = externAppsFunctions || {};

var allEvents;

function addLeadingZero (num) {
 if (num < 10) {
   return "0" + num;
 } else {
   return "" + num;
 }
};

function addCalendarEvent(key,userName,description,time)
{
  var events = allEvents.options.events;
  var currentAppointments = {}
  currentAppointments[key] = events[key];

  if (events[key]) {
    currentAppointments[key].number +=  1;
    var newindex = currentAppointments[key].dayEvents.length;
    var newAppointment = {
      "userName": userName,
      "description": description,
      "time": time
    };

    currentAppointments[key].dayEvents[newindex] = newAppointment;

    $(".responsive-calendar").responsiveCalendar('edit', currentAppointments);
  } else {

    var editData = {};
    editData[key] = {
      "number": 1,
      "dayEvents": [{
        "userName": userName,
        "description": description,
        "time": time
      }]
    };

    $(".responsive-calendar").responsiveCalendar('edit', editData);
  };
};



var form2object = function(form) {
  var data = {};
  $(form).find("input").each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};

$(document).ready(function () {
  $('#showEvents').on('click',function (event){
    console.log('Got here');
    var resultString = JSON.stringify(allEvents.options.events);
    $('#result').val(resultString);
  });

  $('#create-appointment').on('submit', function(e) {
    e.preventDefault();
    var appointmentData = form2object(this);

    var events = allEvents.options.events;
    var currentAppointments = {}
    var key = appointmentData.appointmentDate;
    currentAppointments[key] = events[key];

    if (events[key]) {
      currentAppointments[key].number +=  1;
      var newindex = currentAppointments[key].dayEvents.length;
      var newAppointment = {
        "userName": appointmentData.appointmentOwer,
        "description": appointmentData.appointmentDescription,
        "time": appointmentData.appointmentTime
      };

      currentAppointments[key].dayEvents[newindex] = newAppointment;

      $(".responsive-calendar").responsiveCalendar('edit', currentAppointments);
    } else {

      var editData = {};
      editData[appointmentData.appointmentDate] = {
        "number": 1,
        "dayEvents": [{
          "userName": appointmentData.appointmentOwer,
          "description": appointmentData.appointmentDescription,
          "time": appointmentData.appointmentTime
        }]
      };

      $(".responsive-calendar").responsiveCalendar('edit', editData);
    }
    $('#create-appointment').trigger("reset");
  });

$('#clearEvents').on('click',function (){
  console.log("got click");

  $(".responsive-calendar").responsiveCalendar('clearAll');

});


$(".responsive-calendar").responsiveCalendar({
  time: '2015-12',
  startFromSunday: true,
  allRows: false,

  onDayHover: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );
    var  thisDayEvent = events[key];

    var resultString = key;

    if (thisDayEvent) {
      resultString += JSON.stringify(thisDayEvent);
      }
    $('#result').val(resultString);
    },


  onDayClick: function(events) {
    var key = $(this).data('year')+'-'+addLeadingZero( $(this).data('month') )+'-'+addLeadingZero( $(this).data('day') );

    $("#appointment-date").val(key);

    },

  onInit: function() {
   allEvents = this;
   api.getCalendar(fillCalendarCallback);
    }

  })
});


externAppsFunctions['addCalendarEvent'] = addCalendarEvent;
