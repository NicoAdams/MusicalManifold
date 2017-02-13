define(function(require) {	
	vec = require('./vec');
	viewport = require('./viewport');

	var meshCreator = {};
	
	meshCreator.createRoundMesh = function(sizeVec, countVec, color)	{
		var mesh = {}
		
		getBasePoint = function(r, theta) {
			x = r * Math.cos(theta);
			y = r * Math.sin(theta);
			return vec(2*x/(countVec.x-1)-1, 2*y/(countVec.y-1)-1);
		}
	}
	
	meshCreator.createMesh = function(sizeVec, countVec, color) {
		var mesh = {};
		
		getUnitVec = function(a, b) {
			return vec(2*a/(countVec.x-1)-1, 2*b/(countVec.y-1)-1);
		}
		
		getBasePoint = function(a, b) {
			return getUnitVec(a, b)
		}
		
		getCircleBasePoint = function(a, b) {
			unitVec = vec(2*a/(countVec.x-1)-1, 2*b/(countVec.y-1)-1);
			
			unitVec.x *= Math.sqrt(2) * Math.sqrt(1-unitVec.y**2);
			unitVec.y *= Math.sqrt(2);
			return unitVec;
		}
		
		getPolarBasePoint = function(a, b) {
			unitVec = vec(2*a/(countVec.x-1)-1, 2*b/(countVec.y-1)-1);
			
			r = (unitVec.x + 1)/2
			theta = unitVec.y * Math.PI
			return vec(r * Math.cos(theta), r * Math.sin(theta));
		}
		
		mesh.getPoints = function(fMapPoint=function(v){return v}) {
			var points = [];
			for(var x = 0; x < countVec.x; x++) {
				points[x] = [];
				for(var y = 0; y < countVec.y; y++) {
					points[x][y] = fMapPoint(getBasePoint(x, y)).multiply(sizeVec);
					// points[x][y] = fMapPoint(getCircleBasePoint(x, y)).multiply(sizeVec);
				}
			}
			return points;
		}
		
		function drawLine(p1, p2) {
			d = Math.abs(vec(0,0).copy(p1).subtract(p2).horizontalAngleDeg());
			color = util.rgb(d + 100, 250 - d, d + 100);
			viewport.drawLine(p1, p2, color);
		}
		
		mesh.draw = function(fDisplacePoint) {
			points = mesh.getPoints(fDisplacePoint);
			for(var x = 0; x < countVec.x; x++)
			{
				for(var y = 0; y < countVec.y; y++)
				{
					if(x > 0) {
						drawLine(points[x-1][y], points[x][y], color);
					}
					if(y > 0) {
						drawLine(points[x][y-1], points[x][y], color);
					}
				}
			}
		}
		
		return mesh;
	}
	return meshCreator;
});

