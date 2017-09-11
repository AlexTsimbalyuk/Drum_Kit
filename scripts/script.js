/* --- video player --- */

var video = document.getElementById("video");
var btn = document.querySelector(".play-pause");

btn.onclick = function () {
	if ( video.currentTime >= 0 && btn.innerHTML == "PLAY" ) {
		video.play();
		btn.innerHTML = "PAUSE";
	} 
	else if ( video.currentTime > 0 && btn.innerHTML == "PAUSE" ) {
		video.pause();
		btn.innerHTML = "PLAY";
	}
};

video.ontimeupdate = function() {
	if ( video.ended ) {
		video.currentTime = 0;
		btn.innerHTML = "PLAY";
	}
}

/* --- drum kit --- */

var drumPedal = document.querySelector(".bass-pedal-kick");
var key;

window.addEventListener("keydown", function( event ) {
	key = document.querySelector('div[data-key="' + event.keyCode + '"]'); 
	if ( !key ) {
		return;
	} else {
		var sound = key.dataset.sound;
		var audio = new Audio(); 
		audio.src = sound;
		audio.play();	
		if ( key.className == "bass" ){
			drumPedal.classList.add("active");
			key.classList.add("active");
		} else {
			key.classList.add("active");
		}
	}
});

window.addEventListener("keyup", function( event ) {
	if ( !key ) {
		return;
	} else {
		key.classList.remove("active");
		drumPedal.classList.remove("active");
	}
});

/* --- audio player --- */
/*
function render() {
	var opt = document.querySelectorAll("option");

	for ( var i = 0; i < opt.length; i++ ){
		if ( opt[i].selected ) {
			song = opt[i].value;
		}
	}
}

var playAudio = document.querySelector(".play-audio");

playAudio.onclick = function() {
	
	render();
	var audio = new Audio();
	audio.pause();
	audio.src = song;
	audio.play();
}
*/








