function getParentFolderName(file){
    const path = file.webkitRelativePath.split(file.name)[0];
    const separator = path[path.length - 1];
    const folders = path.split(separator);
    const parentFolderName = folders[folders.length - 2];
    return parentFolderName;
}

function loadImage(file){
  return new Promise((resolve) => {    
    const img = new Image();
    const imgUrl = URL.createObjectURL(file);
    img.src = imgUrl;
    // Decode is to wait the image to load, onload wasn't working
    // https://stackoverflow.com/questions/70530560/javascript-image-onload-fails-on-firefox-and-chrome
    img.decode().then(() => {
      resolve(img);
    });
  });
}

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
/* 
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      return false;
    };
}
*/
