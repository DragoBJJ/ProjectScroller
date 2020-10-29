const scroller = new Scroller();
document.addEventListener("wheel", e => scroller.listenScroll(e));
document.addEventListener("keydown", e => {
  if (e.keyCode === 40) {
    scroller.directionScroll(1);
  } else if (e.keyCode === 38) {
    scroller.directionScroll(-1);
  }
});
