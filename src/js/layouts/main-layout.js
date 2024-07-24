export default class MainLayout {
  #mainElement = null;
  #footerElement = null;

  constructor(mainElement, footerElement) {
    this.#mainElement = mainElement;
    this.#footerElement = footerElement;
  }

  hide() {
    this.#mainElement.classList.add("hidden");
    this.#footerElement.classList.add("hidden");
  }

  show() {
    this.#mainElement.classList.remove("hidden");
    this.#footerElement.classList.remove("hidden");
  }
}
