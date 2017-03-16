				   
function addLabelArea(labelLocation, labelWidth) {
  var i = 0;
  var listArea = {};
  var labelArea = new LabelBox(labelLocation, labelWidth);
  for (i = 0; i < labelAreaList.length; i++) { 
    listArea = labelAreaList[i];
	detectCollision(labelArea,listArea);
  }  
  labelAreaList.push(labelArea);
  labelLocation.x = labelArea.x + (2.0 * offset);
  labelLocation.y = labelArea.y + fontHeight;	
  }

function LabelBox(labelLocation, labelWidth) {
  this.x = labelLocation.x - (2.0 * offset);
  this.y = labelLocation.y - fontHeight;
  this.width = labelWidth + 4.0 * offset;
  this.height = 3.0 * fontHeight;
  this.verticalAdjust = " ";
}	

function detectCollision(labelArea,listArea){
  if (labelArea.x < listArea.x + listArea.width &&
     labelArea.x + labelArea.width > listArea.x &&
     labelArea.y < listArea.y + listArea.height &&
     labelArea.height + labelArea.y > listArea.y) {
	 // collision detected!
    if (labelArea.y > listArea.y &&
	   labelArea.verticalAdjust != "down") {
      labelArea.verticalAdjust = "up";
	  labelArea.x += labelArea.height *
	    (deltaX/deltaY);
	  labelArea.y += labelArea.height; 	
	} else {
      labelArea.verticalAdjust = "down"; 
	  labelArea.x -= labelArea.height *
	    (deltaX/deltaY);
	  labelArea.y -= labelArea.height; 	
    }		
  }
}
