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
}
