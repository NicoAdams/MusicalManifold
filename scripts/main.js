define(function(require) {
	meshCreator  = require('./mesh_creator');
	viewport     = require('./viewport');
	audioContext = require('./audio_context');
	song         = require('./song');
	
	invincible = new song("music/DEAF KEV - Invincible.mp3")

	gridSize = 35
	gridAudioWidth = Math.floor(audioContext.bufferSize/gridSize)

	mesh = meshCreator.createMesh(vec(150,150), vec(gridSize,gridSize));

	function processAudioData(data)
	{
		result = []

		for (var i = 0; i < gridSize; i++) {
			dataSlice = data.slice(i*gridAudioWidth, (i+1)*gridAudioWidth)
			result.push(Math.mean(dataSlice))
		}
		
		return(result)
	}
	
	function drawFunc(t) {
		return function(v) {
			motion = 0.2 * 1/(10*v.x**2 + 1)
			xd = Math.sin(5*v.x + v.y + t*0.01) * motion;
			yd = Math.sin(5*v.x + v.y + t*0.01 + 1) * motion;
			return vec(v.x + xd, v.y + yd);
		}
	}


	function basicMusicDrawFunc(t){
		return function(v){

		// update the music data
		audioContext.updateTimeData()
		audioContext.updateFrequencyData()

		// data = processAudioData(audioContext.timeData)


		timeDataSum = -3000/audioContext.frequencyData.reduce(function(a, b) {return a + b;})

		// freqIdx = Math.floor((v.x+1)/2*audioContext.bufferSize)
		// freqValue = audioContext.frequencyData[freqIdx]*-.01

		// timeIdx = Math.floor((v.y+1)/2*audioContext.bufferSize)
		// timeValue = audioContext.timeData[freqIdx]*.1

		dx = Math.sin(v.x*Math.PI*2+v.y*2+t*.0008*timeDataSum*.00000001)
		dy = Math.cos(v.y*Math.PI+v.x*5+t*.0008)*timeDataSum*3

		return vec(v.x + dx/5, v.y + dy/5);

		}
	}
	
	function getTime() {
		return (new Date).getTime();	
	}
	
	function draw(){
		viewport.clear();
		mesh.draw(basicMusicDrawFunc(getTime()));
		requestAnimationFrame(draw)
	}
	draw()
});
