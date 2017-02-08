define(function(require) {	
	vec = require('./vec')
	
	meshCreator = {};
	meshCreator.createMesh = function(xCount, yCount) {
		mesh = {}
		
		getBasePoint = function(x, y) {
			return vec(x / (xCount - 1), y / (yCount - 1))
		}
		
		mesh.getPoints = function(fDisplacePoint = function(v) {return vec(0,0)}) {
			points = []
			for(x = 0; x < xCount; x++) {
				points[x] = []
				for(y = 0; y < yCount; y++) {
					basePoint = getBasePoint(x, y)
					points[x][y] = basePoint.add(fDisplacePoint(basePoint))
				}
			}
			return points;
		}
		return mesh
	}
	return meshCreator
})
