document.addEventListener('DOMContentLoaded', function () {
  var isDragging = false;
  var oBox = document.querySelector('.aplayer-body');
  var container = document.body;

  var startX = 0;
  var startY = 0;
  var moveX = 0;
  var moveY = 0;
  var deltaX = 0;
  var deltaY = 0;
  var lastMoveTime = 0;
  var velocityX = 0;
  var velocityY = 0;

  container.addEventListener('mousedown', handleStart);
  container.addEventListener('touchstart', handleStart);
  container.addEventListener('mousemove', handleMove);
  container.addEventListener('touchmove', handleMove);
  container.addEventListener('mouseup', handleEnd);
  container.addEventListener('touchend', handleEnd);

  function handleStart(e) {
    e.preventDefault();

    if (e.type === 'mousedown') {
      startX = e.clientX;
      startY = e.clientY;
    } else if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    if (oBox !== null && e.target === oBox) {
      isDragging = true;
      deltaX = 0;
      deltaY = 0;
      lastMoveTime = Date.now();
    } else {
      isDragging = false;
    }
  }

  function handleMove(e) {
    e.preventDefault();

    if (isDragging && oBox !== null) {
      if (e.type === 'mousemove') {
        moveX = e.clientX;
        moveY = e.clientY;
      } else if (e.type === 'touchmove') {
        moveX = e.touches[0].clientX;
        moveY = e.touches[0].clientY;
      }

      deltaX = moveX - startX;
      deltaY = moveY - startY;

      var now = Date.now();
      var deltaTime = now - lastMoveTime;
      lastMoveTime = now;

      velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
      velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;

      startX = moveX;
      startY = moveY;

      var offsetX = moveX - oBox.offsetWidth / 2;
      var offsetY = moveY - oBox.offsetHeight / 2;
      oBox.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }
  }

  function handleEnd() {
    isDragging = false;
    if (oBox !== null) {
      var inertiaDuration = 500;
      var inertiaDistanceX = velocityX * inertiaDuration;
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

          var offsetX = newX - oBox.offsetWidth / 2;
          var offsetY = newY - oBox.offsetHeight / 2;
          oBox.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;

          requestAnimationFrame(inertiaScroll);
        }
      }

      requestAnimationFrame(inertiaScroll);
    }
  }

  function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
});
