export default class TodosConuterContainer {
  #element = null;

  constructor(element) {
    this.#element = element;
  }

  render(count) {
    const text = `item${count !== 1 ? "s" : ""}`;

    this.#element.innerHTML = `
      <strong>${count}</strong> ${text} left
    `;
  }
}
