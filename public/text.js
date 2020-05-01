
window.onload = function () {
  window.onload = function () {
    var mouseClass = document.getElementsByClassName("mouseClass");
    document.onmousemove = function (event) {
            event = event || window.event;/*||为或语句，当IE不能识别event时候，就执行window.event 赋值*/
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            var sl = document.body.scrollLeft|| document.documentElement.scrollLeft;
            var left = event.clientX;
            var top = event.clientY;
            mouseClass[0].style.left = left+sl+"px";
            mouseClass[0].style.top = top+st+"px";
    }
  }
}
