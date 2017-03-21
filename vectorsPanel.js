				   
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
  if (labelArea.x < listArea.x + listArea.width &&
     labelArea.x + labelArea.width > listArea.x &&
     labelArea.y < listArea.y + listArea.height &&
     labelArea.height + labelArea.y > listArea.y) {
	 // collision detected!
	 line = labelArea.line;
     deltaX = line.x2 - line.x1;
     deltaY = line.y2 - line.y1;
	 xIncrement = labelArea.height * (deltaX/deltaY);
	 if (Math.abs(xIncrement) < labelArea.width) xIncrement = 0;
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
}
