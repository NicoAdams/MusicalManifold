define(function(require) {
	audioContext = require('./audio_context');

	var song = function(source = "music/DEAF KEV - Invincible.mp3")
	{

		var audioEllement = new Audio();
			audioEllement.src = source
			audioEllement.autoplay = true;
			audioEllement.playbackRate = 1;


		var gain = audioContext.createGain()
			gain.gain.value = .1

		songMediaSource = audioContext.createMediaElementSource(audioEllement)
		songMediaSource.connect(gain)
		songMediaSource.connect(audioContext.analyser)
		gain.connect(audioContext.destination)

	}

	return(song)
});