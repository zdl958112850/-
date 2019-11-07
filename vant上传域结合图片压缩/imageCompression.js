export const base64Image = function (param) {
    var fileInput = param.file;

    var widthInput = param.width ? param.width : 750;

    var ratioInput = param.ratio ? param.ratio : 0.75;

    var callback = param.callback ? param.callback : null;

    if (!window.FileReader) {
        return;
    }
    /*创建新的图片JS对象*/
    var image = new Image();
    image.src = fileInput;
    image.onload = function () {
        var canvas = document.createElement("canvas");
        var scale = image.width / image.height;
        //正常
        canvas.width = image.width < widthInput ? image.width : widthInput;
        canvas.height = parseInt(canvas.width / scale);
        canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        var imageUrl = canvas.toDataURL("image/jpeg", ratioInput);
        if (callback) {
            callback(imageUrl)
        }
    };
};