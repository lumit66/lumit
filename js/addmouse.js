window.onload = function() {
    // 1. 获取元素，使用类名选择器
    var oBox = document.querySelector(".aplayer-body");
    
    var isDragging = false; // 标记是否正在拖拽

    // 2. 鼠标按下事件
    oBox.onmousedown = function (ev) {
        isDragging = true; // 开始拖拽
        var ev = ev || window.event;

        // 获取鼠标相对于盒子的坐标
        var x2 = ev.clientX - oBox.getBoundingClientRect().left;
        var y2 = ev.clientY - oBox.getBoundingClientRect().top;

        // 鼠标移动
        document.onmousemove = function (ev) {
            if (!isDragging) return; // 如果没有在拖拽则不处理
            
            var ev = ev || window.event;
            var x3 = ev.clientX;
            var y3 = ev.clientY;
            oBox.style.top = y3 - y2 + "px";
            oBox.style.left = x3 - x2 + "px";
        }
    }

    // 3. 鼠标松开事件
    document.onmouseup = function () {
        isDragging = false; // 停止拖拽
        document.onmousemove = null;
    }
};
