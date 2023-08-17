document.addEventListener('DOMContentLoaded', function () {
  var mouseOffsetX = 0; // 鼠标点击位置相对于元素左上角的偏移量
  var mouseOffsetY = 0;
  var isDragging = false; // 是否正在拖动元素

  var container = document.body; // 容器元素

  container.addEventListener('mousedown', handleStart); // 监听鼠标按下事件
  container.addEventListener('touchstart', handleStart); // 监听触摸开始事件
  container.addEventListener('mousemove', handleMove); // 监听鼠标移动事件
  container.addEventListener('touchmove', handleMove); // 监听触摸移动事件
  container.addEventListener('mouseup', handleEnd); // 监听鼠标松开事件
  container.addEventListener('touchend', handleEnd); // 监听触摸结束事件

  function handleStart(e) {
    e.preventDefault();

    var oBox = e.target.closest('.aplayer-body'); // 需要拖动的元素

    if (!oBox) return; // 如果没有找到目标元素，则退出函数

    var startX, startY;

    if (e.type === 'mousedown') {
      startX = e.clientX;
      startY = e.clientY;
    } else if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    isDragging = true; // 开始拖动元素
    mouseOffsetX = startX - oBox.offsetLeft;
    mouseOffsetY = startY - oBox.offsetTop;
  }

  function handleMove(e) {
    e.preventDefault();

    if (!isDragging) return; // 如果没有正在拖动元素，则退出函数

    var moveX, moveY;

    if (e.type === 'mousemove') {
      moveX = e.clientX;
      moveY = e.clientY;
    } else if (e.type === 'touchmove') {
      moveX = e.touches[0].clientX;
      moveY = e.touches[0].clientY;
    }

    var deltaX = moveX - startX;
    var deltaY = moveY - startY;

    var now = Date.now();
    var deltaTime = now - lastMoveTime;
    var velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
    var velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;

    startX = moveX;
    startY = moveY;

    var oBox = document.querySelector('.aplayer-body'); // 需要拖动的元素
    oBox.style.transform = `translate3d(${moveX - mouseOffsetX}px, ${moveY - mouseOffsetY}px, 0)`;
    // 更新元素位置
  }

  function handleEnd() {
    isDragging = false; // 停止拖动

    var inertiaDuration = 500; // 惯性滚动持续时间
    var inertiaDistanceX = velocityX * inertiaDuration; // 惯性滚动距离
    var inertiaDistanceY = velocityY * inertiaDuration;

    var startTime = Date.now();

    function inertiaScroll() {
      var currentTime = Date.now();
      var elapsedTime = currentTime - startTime;

      if (elapsedTime < inertiaDuration) {
        var distanceX = easeOutCubic(elapsedTime, 0, inertiaDistanceX, inertiaDuration);
        var distanceY = easeOutCubic(elapsedTime, 0, inertiaDistanceY, inertiaDuration);

        var newX = moveX + distanceX;
        var newY = moveY + distanceY;

        var oBox = document.querySelector('.aplayer-body'); // 需要拖动的元素
        oBox.style.transform = `translate3d(${newX - mouseOffsetX}px, ${newY - mouseOffsetY}px, 0)`;

        requestAnimationFrame(inertiaScroll);
        // 使用requestAnimationFrame方法在下一帧中执行惯性滚动
      }
    }

    requestAnimationFrame(inertiaScroll);
    // 使用requestAnimationFrame方法开始惯性滚动
  }

  // 缓动函数
  function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
});
