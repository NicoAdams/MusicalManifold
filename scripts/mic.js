define(function(require) {
	audioContext = require('./audio_context');

	var mic = function(){

		// set up for audio input
		try {
			navigator.getUserMedia = navigator.webkitGetUserMedia
			navigator.getUserMedia({audio: true, video: false}, connectStream, microphoneError);
		}
		catch(e) {
			alert("Sorry, your browser doesn't support the magic of getUserMedia \n try the latest firefox or chrome");
		}
		

		function connectStream(stream)
		{
			source = audioContext.createMediaStreamSource(stream);
			
			// audioContext.oscillator = audioContext.createOscillator();

			// // audioContext.oscillator.type = 'square';
			// audioContext.oscillator.frequency.value = 440; // value in hertz

			// var gain = audioContext.createGain()
			// gain.gain.value = .1



			// audioContext.oscillator.connect(gain);
			// gain.connect(audioContext.destination)
			// audioContext.oscillator.start();
			// source = audioContext.oscillator
			source.connect(audioContext.analyser)
		}

		function microphoneError(e)
		{
			alert('MicrophoneError error!', e);
		};

		
	}

		return(mic)
});