define(function(require) {
	meshCreator  = require('./mesh_creator');
	viewport     = require('./viewport');
	audioContext = require('./audio_context');
	song         = require('./song');
	mic          = require('./mic');
	maps         = require('./maps')
	
	// either input a song or use the mic for input (connected determines weather the song is connected to the speakers)
	invincible = new song("music/DEAF KEV - Invincible.mp3", connected = true, gainValue = .1)
	// mic()

	// parameters you might want to tune
	audioContext.analyser.smoothingTimeConstant = .9; // the closer to 1 the smoother bet less precises the data will be
	gridresolution = vec(20,20) // number of horizontal and vertical grid nodes
	gridSize       = vec(200,200) //width and height of grid in pixels


	mesh           = meshCreator.createMesh(gridSize,gridresolution);
	
	function time() {return (new Date()).getTime() / 1000}
	function draw()
	{
		t = time()
		map = maps.basicMusicDrawFunc(t)

		// clear and render the new grid
		viewport.clear();
		mesh.draw(map);

		// cordially ask the browser to insert draw in to the render cycle when it is convenient
		requestAnimationFrame(draw)
	}

	// start the draw loop
	draw()
});
