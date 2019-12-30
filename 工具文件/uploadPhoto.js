/**
 * 将文件流转成base64
 * @param file
 * @returns {Promise<any>}
 */
export function getBase64(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}

/**
 * 上传图片处理
 * @param str
 * @param arr
 * @returns {T[] | Array}
 */
export function uploadImageProcessing(str, arr) {
  let array = [];
  let index = 0;
  arr.forEach((item, i) => {
    if (str.indexOf(item) != -1) {
      index = i;
    }
  });
  array = arr.length === 1 ? [] : arr.splice(index);
  return array;
}
