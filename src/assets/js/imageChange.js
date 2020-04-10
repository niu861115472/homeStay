import EXIF from 'exif-js'

//获取图片方向

function getPhotoOrientation(img) {
   // var file = document.getElementById("image").files;
   //  console.log(file)
    var orient;
    EXIF.getData(img, function () {
       orient = EXIF.getTag(this, 'Orientation');
    });
    alert(orient)
    return orient;
 }

 //图片压缩
function compress(img, width, height, ratio) {
    var canvas, ctx, img64, orient;
 　　　 
    //获取图片方向
    orient = getPhotoOrientation(img);
  
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  
    ctx = canvas.getContext("2d");
  
    //如果图片方向等于6 ，则旋转矫正，反之则不做处理
    if (orient == 8) {
       ctx.save();
       ctx.translate(width / 2, height / 2);
       ctx.rotate(270 * Math.PI / 180);
       ctx.drawImage(img, 0 - height / 2, 0 - width / 2, height, width);
       ctx.restore();
    } else {
       ctx.drawImage(img, 0, 0, width, height);
    }
  
    img64 = canvas.toDataURL("image/jpeg", ratio);
    return img64;
 }

 export {
    getPhotoOrientation,
    compress
 }