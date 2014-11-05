$(document).ready(function(){
	
	var restaurants = [];

	//remove winner
	var removeWinnerHeader = function(){
		while (winnerHeader.hasChildNodes()) {
			winnerHeader.removeChild(winnerHeader.lastChild);
		};   
	};

	//remove restaurant list options
	var removeOptions = function(){
		while (list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		};
	};

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

		if (winnerHeader.hasChildNodes()) {
			removeOptions();
			removeWinnerHeader();   
		}

		var q = $('#restaurant').val();

		restaurants.push(q);

		$('#list').append('<div>'+q+'</div>');
		$('#restaurant').val('');

		console.log(restaurants);
	});

	//clear button function
	$('#clear').click(function(){

		removeOptions();
		removeWinnerHeader();   

		restaurants = [];
	});

	//game on button function
	$('#gameOn').click(function(){

		if (restaurants.length <= 1){
		  alert('enter at least two restaurant names');
		  return false;
		}

		var audio = new Audio('mk.mp3');
		audio.play();
		$('#clear').addClass('hide');

		//loop removes one option at a time
		function removeLoop() {

			setTimeout(function() { 
				if (restaurants.length > 1) {
				 	var loser = Math.floor(Math.random()*restaurants.length);

				  	console.log(restaurants.length);

				  	$('#list').children().eq([loser]).addClass('animated rollOut').on(
					    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
					    function() {
					        list.removeChild(list.childNodes[loser]);
					    }
					);
			 						 	
				 	restaurants.splice(loser, 1);
				 	//recursively called
				 	removeLoop();				 	
				}
				else {
					removeWinnerHeader();
					$('#winnerHeader').append('<h1 class="animated flash">GO EAT SOME FUCKING '+restaurants[0].toUpperCase());
					audio.pause();
					fatality = new Audio('fatality.mp3');
					fatality.play();
					$('#clear').removeClass('hide');
				}
		 	}, 2500);			
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