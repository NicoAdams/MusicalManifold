define(function(require) {
	meshCreator = require('./mesh_creator');
	viewport = require('./viewport');
	
	mesh = meshCreator.createMesh(vec(150,150), vec(25,25));
	
	function drawFunc(t) {
		return function(v) {
			motion = 0.2 * 1/(10*v.x**2 + 1)
			xd = Math.sin(5*v.x + v.y + t*0.01) * motion;
			yd = Math.sin(5*v.x + v.y + t*0.01 + 1) * motion;
			return vec(v.x + xd, v.y + yd);
		}
	}
	
	function getTime() {
		return (new Date).getTime();	
	}
	
	setInterval(function() {
		viewport.clear();
		mesh.draw(drawFunc(getTime()));
	});
});
