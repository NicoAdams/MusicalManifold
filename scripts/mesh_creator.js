define(function(require) {	
	vec = require('./vec');
	viewport = require('./viewport');
	
	var meshCreator = {};
	meshCreator.createMesh = function(sizeVec, countVec, color) {
		var mesh = {};
		
		getBasePoint = function(x, y) {
			return vec(2*x/(countVec.x-1)-1, 2*y/(countVec.y-1)-1);
		}
		
		mesh.getPoints = function(fMapPoint=function(v){return v}) {
			var points = [];
			for(var x = 0; x < countVec.x; x++) {
				points[x] = [];
				for(var y = 0; y < countVec.y; y++) {
					points[x][y] = fMapPoint(getBasePoint(x, y)).multiply(sizeVec);
				}
			}
			return points;
		}
		
		mesh.draw = function(fDisplacePoint) {
			points = mesh.getPoints(fDisplacePoint);
			for(var x = 0; x < countVec.x; x++)
			{
				for(var y = 0; y < countVec.y; y++)
				{
					if(x > 0) {
						viewport.drawLine(points[x-1][y], points[x][y]);
					}
					if(y > 0) {
						viewport.drawLine(points[x][y-1], points[x][y]);
					}
				}
			}
		}
		
		return mesh;
	}
	return meshCreator;
});

