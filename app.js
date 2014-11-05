$(document).ready(function(){
    
    var restaurants = [];

    //submit button on enter
    $('.container').keypress(function(e){
        if(e.which == 13){
        //Enter key pressed
            $('#submit').click();
            //Trigger submit button click event
        }
    });

    //submit button function
    $('#submit').click(function(){
        var q = $('#restaurant').val();

        restaurants.push(q);

        $('#list').append('<div>'+q+'</div>');
        $('#restaurant').val('');

        console.log(restaurants);
    });

    //clear button function
    $('#clear').click(function(){

        while (list.hasChildNodes()) {
            list.removeChild(list.lastChild);
        };   
        restaurants = [];
    });

    //game on button function
    $('#gameOn').click(function(){


    });




    init();
    
    function init() {
      if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
      }
    }
    
    function deviceMotionHandler(eventData) {
      var info, xyz = "[X, Y, Z]";

      // Grab the acceleration including gravity from the results
      var acceleration = eventData.acceleration;
      info = xyz.replace("X", round(acceleration.x));
      info = info.replace("Y", round(acceleration.y));
      info = info.replace("Z", round(acceleration.z));
      // document.getElementById("moAccel").innerHTML = info;

      // Grab the acceleration including gravity from the results
      acceleration = eventData.accelerationIncludingGravity;
      info = xyz.replace("X", round(acceleration.x));
      info = info.replace("Y", round(acceleration.y));
      info = info.replace("Z", round(acceleration.z));
      // document.getElementById("moAccelGrav").innerHTML = info;

      // Grab the acceleration including gravity from the results
      var rotation = eventData.rotationRate;
      info = xyz.replace("X", round(rotation.alpha));
      info = info.replace("Y", round(rotation.beta));
      info = info.replace("Z", round(rotation.gamma));
      // document.getElementById("moRotation").innerHTML = info;

      info = eventData.interval;
      // document.getElementById("moInterval").innerHTML = info;
    }

    function round(val) {
      var amt = 10;
      return Math.round(val * amt) /  amt;
    }
});