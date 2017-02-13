define(function(require) {
	meshCreator  = require('./mesh_creator');
	viewport     = require('./viewport');
	audioContext = require('./audio_context');
	song         = require('./song');
	mic          = require('./mic');
	maps         = require('./maps');
	timer		 = require('./timer');
	
	// either input a song or use the mic for input (connected determines weather the song is connected to the speakers)
	var currSong;// = new song("music/DEAF KEV - Invincible.mp3", connected = true, gainValue = .1)
	// mic();
	
	function startNewSong(path) {
		currSong = new song(path);
	}
	
	window.onOpenFile = function(event) {
		var tmppath = URL.createObjectURL(event.target.files[0]);
		currSong = new song(tmppath, connected = true, gainValue = .2)
	}
	
	// parameters you might want to tune
	audioContext.analyser.smoothingTimeConstant = .5; // the closer to 1 the smoother bet less precises the data will be
	gridresolution = vec(50,50) // number of horizontal and vertical grid nodes
	gridSize       = vec(200,200) //width and height of grid in pixels


	mesh           = meshCreator.createMesh(gridSize,gridresolution);
	
	smoothing = 16;

	function draw()
	{
		// t = time()
		t = timer.ms();
		map = maps.crazyHackedVolumeManifold(t);

		// clear and render the new grid
		viewport.clear();
		mesh.draw(map);

		// cordially ask the browser to insert draw in to the render cycle when it is convenient
		requestAnimationFrame(draw)
	}

	// start the draw loop
	draw()
});
