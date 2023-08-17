document.addEventListener('DOMContentLoaded', function () {
  var mouseOffsetX = 0;
  var mouseOffsetY = 0;
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

    if (e.target === oBox) {
      isDragging = true;
      mouseOffsetX = startX - oBox.getBoundingClientRect().left;
      mouseOffsetY = startY - oBox.getBoundingClientRect().top;
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

      oBox.style.transform = `translate3d(${moveX - mouseOffsetX}px, ${moveY - mouseOffsetY}px, 0)`;
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

          oBox.style.transform = `translate3d(${newX - mouseOffsetX}px, ${newY - mouseOffsetY}px, 0)`;

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
