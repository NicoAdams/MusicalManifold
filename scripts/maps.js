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

// <<<<<<< HEAD
	maps.crazyHackedVolumeManifold = function(t) {
		audioContext.updateFrequencyData()
		timeDataSum = -3000/audioContext.frequencyData.reduce(function(a, b) {return a + b;})
		return function(v){
			dx = Math.sin(Math.cos(t)*v.x*Math.PI*2+v.y*2+t*timeDataSum)*timeDataSum
			dy = Math.cos(v.y*Math.PI*timeDataSum+v.x*5+t*timeDataSum)*timeDataSum
			dr = (timeDataSum - .8) * 2/(10*(v.x**4 + v.y**4) + 1)
			return vec(v.x + dx/30, v.y + dy/30).rotate(dr);
		}
	}

	maps.basicMusicDrawFunc = function(t)		{
		audioContext.updateFrequencyData()
		fData = audioContext.normedFrequencyData
		freqDataSum = fData.reduce(function(a, b) {return a + b;})/audioContext.bufferSize	
		return function(v){

			// update the music data

			// audioContext.updateTimeData()
			
			// normed frequency data yields a float32 array of values between 0 and 1 inclusive

			// dividing by the buffer size produces a normalized value
			freqDataSum = fData.reduce(function(a, b) {return a + b;})/audioContext.bufferSize
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))

			radialWave = .2*Math.sin(2*10**-2*t)*Math.cos(r*Math.PI*3)*Math.pow(10,-r)/3*freqDataSum
			dx = 2*Math.sin(10**-2*t+10*v.y)/10*freqDataSum+radialWave
			dy = 2*Math.cos(10**-2*t+10*v.x)/8*freqDataSum+radialWave

			return vec(v.x + dx, v.y + dy).rotate(10+freqDataSum*-r*2*Math.PI/3);
		}
	}

	maps.freqDependent = function(t, averageOverIndices){
		// update the music data
		audioContext.updateFrequencyData()
		
		// normed frequency data yields a float32 array of values between 0 and 1 inclusive
		fData = audioContext.normedFrequencyData
		return function(v){

			// dividing by the buffer size produces a normalized value
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))

			fIndex = Math.max(0,Math.floor(r/Math.sqrt(2)*audioContext.bufferSize)-1)

			averageRange = 4
			fMag = util.sum(fData.slice(Math.max(0,fIndex-averageRange), Math.min(fIndex+averageRange+1,audioContext.bufferSize-1)))/(averageRange*2*4)
			// fMag = fData.slice(fIndex)
// =======
			fLower = Math.max(0,Math.floor(r/Math.sqrt(2)*audioContext.bufferSize)-1);
			fUpper = fLower + averageOverIndices;
			fMag = util.sum(fData.slice(fLower, fUpper))/averageOverIndices;


			dx =  fMag
			dy = fMag

			return vec(v.x + dx, v.y + dy);
		}
	}
// <<<<<<< HEAD

		maps.basicFFT = function(t){
		// update the music data
			audioContext.updateFrequencyData()
			
			// normed frequency data yields a float32 array of values between 0 and 1 inclusive
			fData = audioContext.normedFrequencyData
		return function(v){

			

			// dividing by the buffer size produces a normalized value
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
			fIndex = Math.max(0,Math.floor((v.x+1)/2*audioContext.bufferSize)-1)
			// console.log(fData.slice(fIndex-1, fIndex+2))
			// fMag = util.sum(fData.slice(fIndex-1, fIndex+2).map(function(e) {e < 0}))
			fMag = fData[fIndex]

			dx =  fMag
			dy = fMag

			return vec(v.x, v.y + dy);
			
			
		}
	}

	maps.rotationalFFT = function(t){
		// update the music data
			audioContext.updateFrequencyData()
			
			// normed frequency data yields a float32 array of values between 0 and 1 inclusive
			fData = audioContext.normedFrequencyData
		return function(v){

			

			// dividing by the buffer size produces a normalized value
			r = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
			fIndex = Math.max(0,Math.floor(r/Math.sqrt(2)*audioContext.bufferSize)-1)
			// console.log(fData.slice(fIndex-1, fIndex+2))
			// fMag = util.sum(fData.slice(fIndex-1, fIndex+2).map(function(e) {e < 0}))
			fMag = fData[fIndex]

			dx =  fMag
			dy = fMag

			return vec(v.x, v.y ).rotate(dy*2*Math.PI);
			
			
		}
	}


	maps.timeToSpace = function(t){
		audioContext.updateFrequencyData()
		fData = audioContext.normedFrequencyData
		volume = util.sum(fData)/audioContext.bufferSize
		return function(v)
		{
			r  = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2))
			dx = 0
			dy = 0

			// range of a piano 27.5 Hz  to 4186 Hz
			frequency = 28
			count = 0

			while (frequency<4000)
			{
				count+=1
				magnitude = audioContext.getFrequencyMagnitudeNormed(frequency)
				dy     += Math.cos(r*Math.PI*frequency/200)*magnitude*Math.pow(10,-r/10)
				frequency+=100

			}
			dy = Math.min(dy,10)
			dy = Math.max(dy,-10)
			
			volume = 1
			return vec(v.x, v.y+dy/10 );
		}
	}

// =======
	
// >>>>>>> origin/gh-pages
	return(maps)

});