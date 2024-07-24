export default class InputService {
  #input = null;

  register(input) {
    this.#input = input;

    return this;
  }

  onKeypress(callback = function () {}) {
    if (!this.#input) {
      throw new Error("Input element is required");
    }

    this.#input.addEventListener("keypress", (event) => {
      const value = event?.target?.value?.trim();

      if (event.key !== "Enter" || !value) {
        return;
      }

      callback?.(value);
      event.target.value = "";
    });

    return this;
  }
}
