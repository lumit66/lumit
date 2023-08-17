window.onload = function () { 
  var mouseOffsetX = 0; // 记录当前鼠标位置11111
  var mouseOffsetY = 0;
  var isDragging = false; // 记录元素是否可以拖动

  // 鼠标事件1：鼠标按下标记元素为可拖动状态，并且记下鼠标当前位置的偏移
  var oBox = document.querySelector('.aplayer-body');
  var container = document.body;

  container.addEventListener('mousedown', (e) => {
    var moveX = e.clientX - oBox.offsetLeft;
    var moveY = e.clientY - oBox.offsetTop;

    if (e.target === oBox) {
      isDragging = true;
      mouseOffsetX = moveX;
      mouseOffsetY = moveY;
    }
  });

  // 鼠标事件2：鼠标开始移动，要检测浮层是否标记为移动，如果是则更新元素位置到当前鼠标位置
  document.onmousemove = (e) => {
    if (isDragging) {
      var moveX = e.clientX - mouseOffsetX;
      var moveY = e.clientY - mouseOffsetY;

      oBox.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  //  鼠标事件3：放开鼠标后，元素变为不可拖动
  document.onmouseup = () => {
    isDragging = false;
  };
};
