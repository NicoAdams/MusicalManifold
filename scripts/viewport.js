define(function(require) {
	vec = require('./vec');
	
	// Creates global canvas and context
	canvas = document.getElementById("canvas")
	c = canvas.getContext("2d")
	
	var viewport = {}
	viewport.centerX = 0,
	viewport.centerY = 0,
	viewport.zoom = 1, // Pixels / in-game units
	viewport.init = function() {
		// Sets up the canvas
		viewport.resizeCanvas();

		// Handles browser resize
		window.onresize = function() {
			viewport.resizeCanvas();
		}
	};
	viewport.getCanvasContext = function() {
		return c;
	};
	viewport.clear = function() {
		// Clears the screen
		canvas.width = canvas.width;
	};
	viewport.screenWidth = function() {
		// Returns the screen width
		return window.innerWidth
	};
	viewport.screenHeight = function() {
		// Returns the screen height
		return window.innerHeight
	};
	viewport.left = function() {
		// Returns the game coord of the left screen edge
		return viewport.centerX - (viewport.screenWidth() / 2) / viewport.zoom
	};
	viewport.right = function() {
		// Returns the game coord of the right screen edge
		return viewport.centerX + (viewport.screenWidth() / 2) / viewport.zoom
	};
	viewport.bottom = function() {
		// Returns the game coord of the bottom screen edge
		return -viewport.centerY - (viewport.screenHeight() / 2) / viewport.zoom
	};
	viewport.top = function() {
		// Returns the game coord of the top screen edge
		return -viewport.centerY + (viewport.screenHeight() / 2) / viewport.zoom
	};
	viewport.toScreen = function(appCoord) { 
		// Converts game coords to pixels
		var x = appCoord.x;
		var y = appCoord.y;
		var xval = (x - viewport.left()) * viewport.zoom;
		var yval = (- y - viewport.bottom()) * viewport.zoom;
		return vec(xval, yval);
	};
	viewport.toApp = function(screenCoord) {
		// Converts pixels to game coords
		var x = screenCoord.x;
		var y = screenCoord.y;
		var xval = x / viewport.zoom + viewport.left();
		var yval = - (y / viewport.zoom + viewport.bottom());
		return vec(xval, yval);
	};
	viewport.resizeCanvas = function() {
		// Initializes the canvas
		canvas.width = viewport.screenWidth();
		canvas.height = viewport.screenHeight();
	};
	viewport.setCenter = function(appCoords) {
		viewport.centerX = appCoords[0];
		viewport.centerY = appCoords[1];
	};
	viewport.setZoom = function(zoom) {
		viewport.zoom = zoom;
	};
	viewport.drawLine = function(p1App, p2App, color="#EEE") {
		p1 = viewport.toScreen(p1App);
		p2 = viewport.toScreen(p2App);

		// c.fillStyle = color;
		// c.fillRect(p1.x,p1.y,1,1)
		
		c.beginPath();
		c.strokeStyle = color;
		c.moveTo(p1.x, p1.y);
		c.lineTo(p2.x, p2.y);
		c.stroke();
	};
	
	viewport.init();
	return viewport;
})
