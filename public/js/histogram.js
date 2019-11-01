window.onLoad = myInit();
function myDisplay()
{
    alert("Inside my Display");
    var cvs = document.getElementById("canvas")
    var ctx = cvs.getContext('2d');
    var columns = 3 , rows = 3;
    
    var tileWidth = Math.round(cvs.width / columns),
        tileHeight  = Math.round(cvs.height / rows);
    
        var img1 = new Image();
        var img2  = new Image();
        img1.onLoad = function() {
                                xIndex = 2 , yIndex = 2;
                                x = xIndex * tileWidth , y = yIndex * tileHeight;
                                ctx.drawImage(img1 , x ,y , tileWidth , tileHeight);
                               
                                xIndex = 0 , yIndex = 0;
                                x = xIndex * tileWidth , y = yIndex * tileHeight;
                                ctx.drawImage(img2 , x ,y , tileWidth , tileHeight); };
  
                   // img1.src = 'images/s2.jpg'
                   // img2.src = 'images/ball.jpg' ;
        
};


function histogram(data)
{
    
}






function handleFiles() {
    var theGoods = document.getElementById('imageFile').files[0];
    
    var reader = new FileReader();
    var img = new Image();
    img.crossOrigin = "Anonymous";
    reader.addEventListener("load", function() { img.src = reader.result; },false);
    //let cv = document.getElementById("canvas");
   // let ctx = cv.getContext("2d");
    img.onload = function()
     {
          fitImageOn(img);

    }// calcAndGraph(img); }
    if (theGoods)
     { 
       reader.readAsDataURL(theGoods);
       }
  }

  
document.getElementById("imageFile").addEventListener("change",handleFiles);  
  function calcAndGraph(img) {
    let rD={}, gD={}, bD={};
    ctx.clearRect(0 ,0 , cvs.width , cvs.height);
    ctx.drawImage(img , xStart , yStart , renderableWidth  , renderableHeight);
    const iD = ctx.getImageData(xStart , yStart ,renderableWidth , renderableHeight).data ;
   // let cv = document.getElementById("canvas");
   // let ctx = cv.getContext("2d");
   // cv.width = img.width;
   // cv.height = img.height;
   // ctx.drawImage(img, 0, 0);
    //const iD=ctx.getImageData(0, 0, cv.width, cv.height).data;
    console.log(xStart);
    console.log(yStart);
    console.log(renderableHeight);
    console.log(renderableWidth);
    console.log(iD);
    for (var i=0; i<256; i++) { rD[i]=0; gD[i]=0; bD[i]=0; }
    for (var i=0; i<iD.length; i+=4) {
      rD[iD[i]]++;
      gD[iD[i+1]]++;
      bD[iD[i+2]]++;
    }
    histogram({rD, gD,bD});
  }


  function amplify(e) {
    const colors = ['red', 'green', 'blue'];
    const boost = e.target.id;
    if (boost=='blend') {
       document.querySelectorAll('rect').forEach(bar=>{
        bar.style.opacity = 0.7;
      });
    }
    else {
      activeColor=boost;
      const deaden = colors.filter(e=>e!==boost);
      document.querySelectorAll('.bar-'+boost).forEach(bar=>{
        bar.style.opacity = 1.0;
      });
      deaden.forEach(color=>{
        document.querySelectorAll('.bar-'+color).forEach(bar=>{
        bar.style.opacity = 0.2;
        });
      });
    }
  }
  var fitImageOn = function(imageObj) {
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
//	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
    }
    calcAndGraph(imageObj);
	//context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};


  function myInit()
  {  
      //alert("inside myInit Function");
      document.getElementById("imageFile").addEventListener("change",handleFiles);
      document.querySelectorAll("button.focuser").forEach(button=>{
          button.addEventListener("click",amplify);
      });
      myDisplay();
  }

  document.addEventListener("DOMContentLoaded",function(event){
    // console.log("Dom loaded");
    // var image=new Image();
    // image.onload=function(){calcAndGraph(image);}
    //  image.src='download.jpg';
    myInit();
})
