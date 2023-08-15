document.addEventListener('DOMContentLoaded', () => {
  const aplayerBody = document.querySelector('.aplayer-body');
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  aplayerBody.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = aplayerBody.getBoundingClientRect();
    offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      aplayerBody.style.left = `${e.clientX - offset.x}px`;
      aplayerBody.style.top = `${e.clientY - offset.y}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});
