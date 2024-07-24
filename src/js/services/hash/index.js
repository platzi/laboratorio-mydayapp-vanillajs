export default class HashService {
  #todoService = null;

  constructor(todoService) {
    const hash = this.#getHash();

    this.#todoService = todoService;
    this.#todoService.changeFilter(hash);
  }

  #getHash() {
    return window.location.hash.replace("#/", "");
  }

  register() {
    window.addEventListener("hashchange", () => {
      const hash = this.#getHash();

      this.#todoService.changeFilter(hash);
    });
  }

  check() {
    const hash = this.#getHash();

    if (hash) {
      this.#todoService.changeFilter(hash);
    }
  }
}
