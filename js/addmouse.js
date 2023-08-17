document.addEventListener("DOMContentLoaded", function () {
  var mouseOffsetX = 0;
  var mouseOffsetY = 0;
  var isDraging = false;

  var oBox = document.querySelector('.aplayer-body');

  oBox.addEventListener('mousedown', function (e) {
    var e = e || window.event;
    mouseOffsetX = e.pageX - oBox.offsetLeft;
    mouseOffsetY = e.pageY - oBox.offsetTop;

    isDraging = true;
  });

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

  document.onmouseup = function () {
    isDraging = false;
  };
});
