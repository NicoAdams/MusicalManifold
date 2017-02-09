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
			console.log(audioContext.analyser)
			source.connect(audioContext.analyser)
		}

		function microphoneError(e)
		{
			alert('MicrophoneError error!', e);
		};

		
	}

		return(mic)
});