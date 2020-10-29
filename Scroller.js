class Scroller {
  constructor() {
    this.sections = [...document.querySelectorAll("section")];
    this.currentIndex = this.sections.findIndex(section => {
      return this.isScrolledIntoView(section);
    });
    this.pausa = false;
    this.drawNavigation();
    this.selectActiveNavItem();
  }
  isScrolledIntoView = elem => {
    const rect = elem.getBoundingClientRect();
    const rectTop = rect.top;
    const rectBottom = rect.bottom;
    const isVisible =
      rectTop <= window.innerHeight && rectBottom >= window.innerHeight;
    return isVisible;
  };

  listenScroll = e => {
    if (this.pausa) return;
    this.pausa = true;

    setTimeout(() => {
      this.pausa = false;
    }, 1000);

    this.direction = e.deltaY > 0 ? 1 : -1;
    this.directionScroll(this.direction);
  };
  directionScroll = direction => {
    if (direction === 1) {
      const lastSection = this.currentIndex === this.sections.length - 1;
      if (lastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentIndex === 0;
      if (firstSection) return;
    }
    this.currentIndex += direction;
    this.scrollToCurrentSection();
  };
  scrollToCurrentSection = () => {
    this.selectActiveNavItem();
    this.sections[this.currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };
  drawNavigation = () => {
    this.nav = document.createElement("div");
    const navList = document.createElement("ul");
    this.nav.classList.add("scroller__nav");
    this.sections.forEach((section, index) => {
      const navElement = document.createElement("li");
      navElement.addEventListener("click", () => {
        this.currentIndex = index;
        this.scrollToCurrentSection();
      });
      navList.appendChild(navElement);
    });
    this.nav.appendChild(navList);
    document.body.appendChild(this.nav);
  };
  selectActiveNavItem = () => {
    const navElements = this.nav.querySelectorAll("li");
    navElements.forEach((elem, index) => {
      if (this.currentIndex === index) {
        elem.classList.add("active");
      } else {
        elem.classList.remove("active");
      }
    });
  };
}
