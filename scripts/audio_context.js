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



	audioContext.bufferSize = Math.pow(2,8)
	// audioContext.bufferSize = 256
	
	audioContext.analyser = audioContext.createAnalyser();
	audioContext.analyser.smoothingTimeConstant = .97;
	audioContext.analyser.fftSize = audioContext.bufferSize*2
	audioContext.frequencyData = new Float32Array(audioContext.bufferSize)
	audioContext.normedFrequencyData = new Float32Array(audioContext.bufferSize)
	audioContext.timeData = new Float32Array(audioContext.bufferSize)

	audioContext.min = audioContext.analyser.minDecibels-15
	audioContext.max = audioContext.analyser.maxDecibels+15
	
	audioContext.normalizeFreqData = function(element)
		{
			scaled = (element-audioContext.min)/(audioContext.max-audioContext.min)
			clamped = Math.min(1,Math.max(scaled,0))
			return(clamped)
		}
			

	audioContext.updateTimeData = function()
	{
		audioContext.analyser.getFloatTimeDomainData(audioContext.timeData)
	}

	audioContext.updateFrequencyData = function()
	{
		audioContext.analyser.getFloatFrequencyData(audioContext.frequencyData)
		audioContext.normedFrequencyData = audioContext.frequencyData.map(audioContext.normalizeFreqData)
	}

	return audioContext
});