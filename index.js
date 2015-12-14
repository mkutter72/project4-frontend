'use strict';


var allEvents;

function addLeadingZero (num) {
 if (num < 10) {
   return "0" + num;
 } else {
   return "" + num;
 }
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

    //  $(".responsive-calendar").responsiveCalendar('edit', {
    //   "2015-12-15": {
    //     "number": 1,
    //     "dayEvents": [{
    //       "userName": "Mike",
    //       "description": "Lunch meeting",
    //       "time": "10:30"
    //     }]
    //   }
    // });
  });


  $(".responsive-calendar").responsiveCalendar({
    time: '2015-12',
    startFromSunday: true,
    allRows: false,
    events: {

      "2015-12-26": {"number": 1, "badgeClass": "badge-warning", "url": "http://w3widgets.com"},

     "2015-12-29": {
        "number": 2,
        "dayEvents": [
        {
          "userName": "Tom",
          "description": "Important meeting",
          "time": "17:30"
        },
        {
          "userName": "Bob",
          "description": "Morning meeting at coffee house",
          "time": "08:15"
        }
        ]
      },


      "2015-12-23": {
          "number": 1,
          "dayEvents": [
          {
            "userName": "Mike",
            "description": "Breakfast",
            "time": "10:00 AM"
          }]
        },


    },



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
   }

 })
});

