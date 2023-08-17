window.onload = function () {
  var mouseOffsetX = 0; // 记录当前鼠标位置
  var mouseOffsetY = 0;
  var isDraging = false; // 记录元素是否可以拖动

  // 鼠标事件1：鼠标按下标记元素为可拖动状态，并且记下鼠标当前位置的偏移
  var oBox = document.querySelector('.aplayer-body');

  oBox.addEventListener('mousedown', function (e) {
    var e = e || window.event;
    mouseOffsetX = e.pageX - oBox.offsetLeft;
    mouseOffsetY = e.pageY - oBox.offsetTop;

    isDraging = true;
  });

  // 鼠标事件2：鼠标开始移动，要检测浮层是否标记为移动，如果是则更新元素位置到当前鼠标位置
  document.onmousemove = function (e) {
    var e = e || window.event;
    var moveX = 0;
    var moveY = 0;

    if (isDraging === true) {
      moveX = e.pageX - mouseOffsetX;
      moveY = e.pageY - mouseOffsetY;

      oBox.style.left = moveX + "px";
      oBox.style.top = moveY + "px";
    }
  };

  //  鼠标事件3：放开鼠标后，元素变为不可拖动
  document.onmouseup = function () {
    isDraging = false;
  };
};