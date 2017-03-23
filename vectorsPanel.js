				   
function addLabelArea(labelLocation, labelWidth, line) {
  var i = 0;
  var listArea = {};
  var labelArea = new LabelBox(labelLocation, labelWidth, line);
  for (i = 0; i < labelAreaList.length; i++) { 
    listArea = labelAreaList[i];
	detectCollision(labelArea,listArea);
  }  
  labelAreaList.push(labelArea);
  labelLocation.x = labelArea.x + (2.0 * offset);
  labelLocation.y = labelArea.y + fontHeight;	
  }

function LabelBox(labelLocation, labelWidth, line) {
  this.x = labelLocation.x - (2.0 * offset);
  this.y = labelLocation.y - fontHeight;
  this.width = labelWidth + 4.0 * offset;
  this.height = 3.0 * fontHeight;
  this.verticalAdjust = " ";
  this.line = line;
  }	

function detectCollision(labelArea,listArea){
  var deltaX, deltaY, line, xIncrement;
  line = labelArea.line;
  if (labelArea.x < listArea.x + listArea.width &&
     labelArea.x + labelArea.width > listArea.x &&
     labelArea.y < listArea.y + listArea.height &&
     labelArea.height + labelArea.y > listArea.y) {
	 // collision detected!
     deltaX = line.x2 - line.x1;
     deltaY = line.y2 - line.y1;
	 xIncrement = labelArea.height * (deltaX/deltaY);
	 if (Math.abs(xIncrement) < labelArea.width ||
	    Math.abs(deltaY) < negligible) xIncrement = 0;
	 if (labelArea.y > listArea.y &&
	   labelArea.verticalAdjust != "down") {
      labelArea.verticalAdjust = "up";
	  labelArea.x += xIncrement;
	  labelArea.y += labelArea.height; 	
	} else {
      labelArea.verticalAdjust = "down"; 
	  labelArea.x -= xIncrement;
	  labelArea.y -= labelArea.height; 	
    }		
  }
  if (areaContainsSegment(line.x1,line.y1,line.x2,line.y2,
    labelArea.x,labelArea.y,labelArea.x + labelArea.width,
	labelArea.y + labelArea.height) = true) {
	if (labelArea.verticalAdjust != "down") {
      labelArea.verticalAdjust = "up";
	  labelArea.x += xIncrement;
	  labelArea.y += labelArea.height; 	
	} else {
      labelArea.verticalAdjust = "down"; 
	  labelArea.x -= xIncrement;
	  labelArea.y -= labelArea.height; 	
    }		
  }

//stackoverflow/a/18292964
function areaContainsSegment (x1,y1,x2,y2,minX,minY,maxX,maxY) {  
  // Returns true if a line segment (the first 4 parameters)
  // intersects an axis aligned rectangle (the last 4 parameters).
	// Completely outside.
	if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || 
	  (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
		return false;

	var m = (y2 - y1) / (x2 - x1);

	var y = m * (minX - x1) + y1;
	if (y > minY && y < maxY) return true;

	y = m * (maxX - x1) + y1;
	if (y > minY && y < maxY) return true;

	var x = (minY - y1) / m + x1;
	if (x > minX && x < maxX) return true;

	x = (maxY - y1) / m + x1;
	if (x > minX && x < maxX) return true;

	return false;
}
	
}