function debounce(func, delay) {
    var timeout;
    return function(e) {
        console.log("清除",timeout,e.target.value)
        clearTimeout(timeout);
        var context = this, args = arguments
        console.log("新的",timeout, e.target.value)
        timeout = setTimeout(function(){
          console.log("----")
          func.apply(context, args);
        }, delay)
    };
};

var validate = debounce(function(e) {
    console.log("change", e.target.value, new Date-0)
}, 380);

// 绑定监听
document.querySelector("input").addEventListener('input', validate);