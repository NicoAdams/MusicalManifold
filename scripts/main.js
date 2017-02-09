define(function(require) {
	meshCreator  = require('./mesh_creator');
	viewport     = require('./viewport');
	audioContext = require('./audio_context');
	song         = require('./song');
	mic          = require('./mic');
	
	invincible = new song("music/DEAF KEV - Invincible.mp3")
	// mic()

	gridSize = 35
	gridAudioWidth = Math.floor(audioContext.bufferSize/gridSize)

	mesh = meshCreator.createMesh(vec(300,300), vec(gridSize,gridSize));
	
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

		dx = Math.sin(Math.cos(t/1000)*v.x*Math.PI*2+v.y*2+t*.0008*timeDataSum*.000000015)*timeDataSum
		// dx = Math.sin(v.x*Math.PI*2*timeDataSum*3+v.y*2+t*.008)/10
		dy = Math.cos(v.y*Math.PI*timeDataSum+v.x*5+t*.0008*timeDataSum*.00000003)*timeDataSum

		return vec(v.x + dx/30, v.y + dy/30);

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
