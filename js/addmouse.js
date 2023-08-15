window.onload = function() {
// 1.获取元素
    var oBox = document.querySelector(".aplayer-body");

    // 2.鼠标按下事件
    oBox.onmousedown = function (ev) {
        var ev = ev || window.event;

        // 获取鼠标相对于盒子的坐标
        var x2 = ev.offsetX;
        var y2 = ev.offsetY;

        // 鼠标移动
        document.onmousemove = function (ev) {
            var ev = ev || window.event;
            var x3 = ev.pageX;
            var y3 = ev.pageY;
            oBox.style.top = y3 - y2 + "px";
            oBox.style.left = x3 - x2 + "px"
        }
    }

    // 4.鼠标松开事件
    document.onmouseup = function () {
        document.onmousemove = function () {

        }
    }
