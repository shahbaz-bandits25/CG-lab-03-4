window.onLoad = myInit();


function myInit()
{
   // document.getElementById("imageFile").addEventListener("change", handleFiles);

    myDisplay();
}

function myDisplay()
{
//    alert("Inside my Display");
    columns = 3 , rows = 3;
    tileWidth = Math.round(cvs.width / columns),
    tileHeight  = Math.round(cvs.height / rows);
    var img1 = new Image();
    var img2 = new Image();
    
    img1.onload = function(){
        xIndex = 2, yIndex = 2;
        x = xIndex * tileWidth, y = yIndex * tileHeight;
        ctx.drawImage(img1, x, y, tileWidth, tileHeight);
    }
    
    img2.onload = function(){
        xIndex = 0, yIndex = 0;
        x = xIndex * tileWidth, y = yIndex * tileHeight;
        ctx.drawImage(img2, x, y, tileWidth, tileHeight);

    }

                   // img1.src = 'images/s.jpg';
                  //  img2.src = 'images/ball.jpg' ;
        

};