define(function(require) {
	audioContext = require('./audio_context');

	var song = function(source = "music/DEAF KEV - Invincible.mp3", connected = true, gainValue = .1)
	{

		var audioEllement = new Audio();
			audioEllement.src = source
			audioEllement.autoplay = true;
			audioEllement.playbackRate = 1;


		var gain = audioContext.createGain()
			gain.gain.value = gainValue

		songMediaSource = audioContext.createMediaElementSource(audioEllement)
		songMediaSource.connect(gain)
		songMediaSource.connect(audioContext.analyser)
		if (connected) {gain.connect(audioContext.destination)}

	}

	return(song)
});