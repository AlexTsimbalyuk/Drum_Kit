/* --- video player --- */

var video = document.getElementById("video");
var videoBtn = document.querySelector(".video-button");

videoBtn.onclick = function () {
	if ( video.currentTime >= 0 && videoBtn.innerHTML == "PLAY" ) {
		video.play();
		videoBtn.innerHTML = "PAUSE";
	} 
	else if ( video.currentTime > 0 && videoBtn.innerHTML == "PAUSE" ) {
		video.pause();
		videoBtn.innerHTML = "PLAY";
	}
}

video.ontimeupdate = function() {
	if ( video.ended ) {
		video.currentTime = 0;
		videoBtn.innerHTML = "PLAY";
	}
}



/* --- control of the drum kit from the keyboard --- */

var drumPedal = document.querySelector(".bass-pedal-kick");
var bassDrum = document.querySelector(".bass");
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
		if ( key.className == "bass hit" ){
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

var audioBtn = document.querySelector(".audio-button");
	audioBtn.addEventListener( "click", playAudio );

function playAudio() {

	if ( audioBtn.innerHTML == "PLAY" ) {
		var audio = new Audio();
		audio.src = songSelect();
		audio.play();
		audioBtn.innerHTML = "STOP";
	} 
	else if ( audioBtn.innerHTML == "STOP" ) {
		window.location.reload();
	}
	
	audio.ontimeupdate = function() {
		if ( audio.ended ) {
			audio.currentTime = 0;
			audioBtn.innerHTML = "PLAY";
		}
	}
}

function songSelect() {
	var opt = document.querySelectorAll("option");

	for ( var i = 0; i < opt.length; i++ ) {
		if ( opt[i].selected ) {
			return opt[i].value;
		}
	}
}



/* --- control of the drum kit with the mouse --- */

hit = document.querySelectorAll(".hit"); 

var arr = [];

for ( var i = 0; i < hit.length; i++ ) {
	arr.push( hit[i].dataset.sound );
	hit[i].num = i;
	hit[i].style.cursor = "pointer";
	hit[i].addEventListener("mousedown", play);
	hit[i].addEventListener("mouseup", del);
	hit[i].addEventListener("mouseout", del);
}

function play() {
	var track = this.num;
	var song = new Audio();
	song.src = arr[track];
	song.play();
	if ( hit[track].dataset.key == 86 ){
		drumPedal.classList.add("active");
		bassDrum.classList.add("active");
	} else {
		hit[track].classList.add("active");
	}
}

function del() {
	var track = this.num;
	if ( hit[track].dataset.key == 86 ){
			drumPedal.classList.remove("active");
			bassDrum.classList.remove("active");
		} else {
			hit[track].classList.remove("active");
		}
}