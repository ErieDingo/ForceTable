				   
function addLabelArea(labelLocation, labelWidth) {
  var verticalAdjust = " ";
  var labelArea = new LabelBox(labelLocation, labelWidth);
  labelAreaList.forEach(detectCollision);
  labelAreaList.push(labelArea);
}

function LabelBox(labelLocation, labelWidth) {
  this.x = labelLocation.x - (2.0 * offset);
  this.y = labelLocation.y - fontHeight;
  this.width = labelWidth + 4.0 * offset;
  this.height = 3.0 * fontHeight;
}	

function detectCollision(listArea){
  if (labelArea.x < listArea.x + listArea.width &&
     labelArea.x + labelArea.width > listArea.x &&
     labelArea.y < listArea.y + listArea.height &&
     labelArea.height + labelArea.y > listArea.y) {
    // collision detected!
    if (labelArea.y > listArea.y &&
	   verticalAdjust != "down") {
      verticalAdjust = "up";
	  labelLocation.x += labelArea.height *
	    (deltaX/deltaY);
	  labelLocation.y += labelArea.height; 	
	} else {
      verticalAdjust = "down"; 
	  labelLocation.x -= labelArea.height *
	    (deltaX/deltaY);
	  labelLocation.y -= labelArea.height; 	
    }		
  }
}
