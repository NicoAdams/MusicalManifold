define(function(require) {

	var audioContext
	
	// set up for audio playback
	try {
	  window.AudioContext = window.AudioContext||window.webkitAudioContext;
	  audioContext = new AudioContext();
	}
	catch(e) {
	  alert("Sorry, your browser doesn't support the magic of web audio \n try the latest firefox or chrome");
	}



	audioContext.bufferSize = Math.pow(2,6)
	// audioContext.bufferSize = 256
	
	audioContext.analyser = audioContext.createAnalyser();
	audioContext.analyser.smoothingTimeConstant = .99;
	audioContext.analyser.fftSize = audioContext.bufferSize
	audioContext.frequencyData = new Float32Array(audioContext.bufferSize)
	audioContext.timeData = new Float32Array(audioContext.bufferSize)

	audioContext.updateTimeData = function()
	{
		audioContext.analyser.getFloatTimeDomainData(audioContext.timeData)
	}

	audioContext.updateFrequencyData = function()
	{
		audioContext.analyser.getFloatFrequencyData(audioContext.frequencyData)
	}

	return audioContext
});