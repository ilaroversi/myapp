
let playIcon = $('#play-icon');
let pauseIcon = $('#pause-icon');
let player = $('#player');
let mediaType = $('#media-type');
let nowPlaying = $('#now-playing');
let controls = $('#media-controls');
let currentMediaType = "song";

let currentSongIndex = 0;
let currentFunnyIndex = 0;
let playing = false;


let songs = ["Video Games.mp3",
"Fade Into You.mp3",
"La Canzone Nostra.mp3"];

let funnies = ["Muriel Gifford's Sea shells .aac",
"belly scratches.aac",
"circumcision.aac",
"five for a sixer.aac",
"flap flap bastards.aac",
"freebacon! .aac",
"ghosties down the u-bend.aac",
"jackets and trouser legs.aac",
"making a balls of the news.aac",
"morning sitcom.aac",
"nobody needs knickers! .aac",
"one-armed man.aac",
"satisfying piss.aac"]


$(document).ready(()=>{
	console.log('page loaded, magic ensues');

	// Put first song in array into src attr of audio element
	player.attr('src', "music/"+songs[currentSongIndex]);
	nowPlaying.text(cleanName(songs[currentSongIndex]));

	playing = false;

})

$(document).ready(function () {
	$('#btAdd').click(function () {
		AddText();
	});

	function AddText() {
		var message="Mr J kissed Baby!";
		$('<p>' + message + '</p>').appendTo('#messageContainer');
	}
});

function handleBold(el){
	$(".media-select .button").removeClass('selected')
	$(el).addClass('selected');
}

// Listen for media-select button presses
function playSong(el){

	currentMediaType = 'song'
	console.log("Mr J wants to play a song");

	handleBold(el)

	mediaType.text('Play our songs')

	nowPlaying.text(cleanName(songs[currentSongIndex]));

	player[0].pause()

	player.attr('src', "music/"+songs[currentSongIndex]);

	pausePlayer();

	controls.show();
	$(".divIDClass").hide();
	$(".divIDClass2").hide();

}

function playFunnyTime(el){
	console.log("Mr J opened the msg");
	mediaType.text(' ')

	handleBold(el)
	$(".divIDClass").show();
	$(".divIDClass2").hide();

	
	nowPlaying.text('')
	controls.hide()

	sendPush();
	
}

function freakout(el){
	console.log("Mr J kisses Baby");
	handleBold(el)
	mediaType.text(' ')

	player[0].pause()

	nowPlaying.text('')

	controls.hide()
	$(".divIDClass").hide();
	$(".divIDClass2").show();


	sendPush();
}

function playPauseClicked(el){
	console.log("Mr J pressed play/pause");
	// console.log('el:', el);

	// find icon that ISN'T hidden
	let clicked = $(el).find('img').not(".hidden")[0];
	clicked = $(clicked).attr('id');
	// console.log("element clicked was:", clicked);

	if (clicked === "play-icon") {
		// Mr J wants to play the media
		player[0].play();

		// show media-playing
		// $('#media-playing').visible();

		if (currentMediaType === "song") {
			nowPlaying.text(cleanName(songs[currentSongIndex]))
		} else {
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}
		

		playing = true

		// hide play-icon, show pause-icon
		playIcon.addClass('hidden');
		pauseIcon.removeClass('hidden');

	} else {

		// Mr J is pausing
		player[0].pause();

		playing = false;

		playIcon.removeClass('hidden')
		pauseIcon.addClass('hidden');
	}
}

function nextClicked(){
	console.log('Mr J clicked next');

	if (currentMediaType === "song") {
			// incrememnt currentSongIndex
			currentSongIndex++
			currentSongIndex > songs.length ? currentSongIndex = 0 : true;
			player.attr('src', "music/"+songs[currentSongIndex]);
			nowPlaying.text(cleanName(songs[currentSongIndex]));
		} else {
			currentFunnyIndex++;
			currentFunnyIndex > funnies.length ? currentFunnyIndex = 0 : true;
			player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}

	if (playing === true) {
		// things are playing
		player[0].play();
	}
	
}

function prevClicked(){
	console.log("Mr J clicked previous")

	if (currentMediaType === "song"){
		currentSongIndex--;
		currentSongIndex < 0 ? currentSongIndex = 0 : true;

		player.attr('src', "music/"+songs[currentSongIndex]);
		nowPlaying.text(cleanName(songs[currentSongIndex]));
	} else {
		currentFunnyIndex--;
		currentFunnyIndex < 0 ? currentFunnyIndex = 0 : true;
		player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
		nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
	}
	

	if (playing === true) {
		// things are playing
		player[0].play();
	}

}



player.on("ended", ()=>{
	console.log("player has ended, hide play button, show pause");
	pausePlayer();
})

function pausePlayer(){
	player[0].pause()
	pauseIcon.addClass('hidden');
	playIcon.removeClass('hidden');
	playing = false;
}


function sendPush(){
	let push = {
		"active": "true",
		"type": "note",
		"title": "HELP",
		"body": "Shit is hitting Mr Js fan!",
		"email": "chrisdermody1@gmail.com"
	}

	let headers = {
		'Content-Type': 'application/json'
	}
	$.ajax({
	         url: "https://api.pushbullet.com/v2/pushes",
	         data: JSON.stringify(push),
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader('Access-Token', 'o.TWdGpN5eMfbFJ6aex5vjmgd9A2qsX6IT').setRequestHeader('Content-Type','application/json');},
	         success: function() { alert("I've been notified darlin, will call as soon as I can! Kisses"); }
	      });
}

// Replace placeholder texts and urls with your own values:

//https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?
// title=If%20this%20is%20set%20will%20create%20notification&icon=http://example.com/icon.png&
// text==:=command text=:=etc&
//  url=http://example.com&
// clipboard=Some+Text&
// file=http://publicurl.com/image.jpg,http://publicurl.com/image2.jpg&
// deviceId=9916eb2045544b20a9b3c3af1f0e0b3e&
// apikey=




function cleanName(name){
	name = name.replace('.mp3', '')
	name = name.replace('.aac', '')
	return name
}


jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
