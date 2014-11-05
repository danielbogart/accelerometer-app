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
		if ($.trim($("#restaurant").val()) === "") {
		  alert('enter a restaurant name');
		  return false;
		}

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
		while (winnerHeader.hasChildNodes()) {
			winnerHeader.removeChild(winnerHeader.lastChild);
		};      

		restaurants = [];
	});

	//game on button function
	$('#gameOn').click(function(){

		if (restaurants.length == 0){
		  alert('enter a restaurant name');
		  return false;
		}

		//loop removes one option at a time
		function removeLoop() {
			setTimeout(function() { 
				if (restaurants.length > 1) {
				 	var loser = Math.floor(Math.random()*restaurants.length);

				  	console.log(restaurants.length);

			 		list.removeChild(list.childNodes[loser])
				 	restaurants.splice(loser, 1);
				 	//recursively called
				 	removeLoop();				 	
				}
				else {
					$('#winnerHeader').append('<h1>GO EAT SOME FUCKING '+restaurants[0].toUpperCase());
				}
		 	}, 1000);

	 	};

		removeLoop(); 

	  	

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