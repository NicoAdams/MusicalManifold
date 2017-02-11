define(function(require) {

	audioContext = require('./audio_context');
	util = require('./util');

	maps = {}


	// Nico, If you dont want this please remove, I dont want to remove it if you want to keep it
	maps.drawFunc = function(t) {
		return function(v) {
			motion = 0.2 * 1/(10*v.x**2 + 1)
			xd = Math.sin(5*v.x + v.y + t*0.01) * motion;
			yd = Math.sin(5*v.x + v.y + t*0.01 + 1) * motion;
			return vec(v.x + xd, v.y + yd);
		}
	}

	maps.crazyHackedVolumeManifold = function(argument) {
		return function(v){

			// update the music data
			audioContext.updateFrequencyData()

			timeDataSum = -3000/audioContext.frequencyData.reduce(function(a, b) {return a + b;})

			dx = Math.sin(Math.cos(t/1000)*v.x*Math.PI*2+v.y*2+t*.0008*timeDataSum*.000000015)*timeDataSum
			dy = Math.cos(v.y*Math.PI*timeDataSum+v.x*5+t*.0008*timeDataSum*.00000003)*timeDataSum

			dr = (timeDataSum - .8) * 2/(10*(v.x**4 + v.y**4) + 1)

			return vec(v.x + dx/30, v.y + dy/30).rotate(dr);
		}
	}

	maps.basicMusicDrawFunc = function(t)		{
		return function(v){

			// update the music data
			// audioContext.updateTimeData()
			audioContext.updateFrequencyData()
			
			// normed frequency data yields a float32 array of values between 0 and 1 inclusive
			fData = audioContext.normedFrequencyData

			// dividing by the buffer size produces a normalized value
			freqDataSum = fData.reduce(function(a, b) {return a + b;})/audioContext.bufferSize
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))

			radialWave = Math.sin(t)*Math.cos(r*Math.PI*3)*Math.pow(10,-r)/3*freqDataSum
			dx = Math.sin(2*t+7*v.y)/10*freqDataSum+radialWave
			dy =  Math.cos(3*t+5*v.x)/8*freqDataSum+radialWave

			return vec(v.x + dx, v.y + dy).rotate(10+freqDataSum*-r*2*Math.PI/3);
			
			
		}
	}

	maps.freqDependant = function(t){
		// update the music data
			audioContext.updateFrequencyData()
			
			// normed frequency data yields a float32 array of values between 0 and 1 inclusive
			fData = audioContext.normedFrequencyData
		return function(v){

			

			// dividing by the buffer size produces a normalized value
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
			fIndex = Math.max(0,Math.floor(r/Math.sqrt(2)*audioContext.bufferSize)-1)
			console.log(fData.slice(fIndex-1, fIndex+2))
			fMag = util.sum(fData.slice(fIndex-1, fIndex+2).map(function(e) {e < 0}))

			dx =  fMag
			dy = fMag

			return vec(v.x + dx, v.y + dy);
			
			
		}
	}

	return(maps)

});