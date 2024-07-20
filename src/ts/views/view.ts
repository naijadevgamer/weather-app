export default class View {
  protected _data: any;
  protected _parentElement: HTMLElement;
  protected _errorMessage: string;

  constructor(parentElement: HTMLElement, errorMessage: string) {
    this._parentElement = parentElement;
    this._errorMessage = errorMessage;
  }

  render(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data: any) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // To create virtual dom
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const currElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl: any, i) => {
      const curEl = currElements[i];
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr: any) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  protected _clear() {
    this._parentElement.innerHTML = "";
  }

  public renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="icons.svg#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message: string = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  protected _convertTemp(temp: number): number {
    return this._data.celcius
      ? Math.round(temp - 273.15)
      : Math.round(((temp - 273.15) * 9) / 5 + 32);
  }
  protected _generateMarkup(): string {
    // Placeholder for implementation in subclass
    return "";
  }
}
