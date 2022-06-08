import StyleSwitcher from "./StyleSwitcher.js";

export default class Painter {
  constructor(settings) {
    this.settings = settings;

    this.paintSettings();
  }

  paintSettings() {
    const settingsSection = document.createElement('section');

    settingsSection.classList.add('settings');
    settingsSection.innerHTML = `
      <p>
        this board will
        <span class="toggle completed-toggle">
          ${this.settings.completedVisibility}
        </span>
        completed items and sort them by
        <select name="ordering" id="ordering">
          ${this.settings.orderOptions?.map(orderOption =>
            `<option value="${orderOption.value}">${orderOption.label}</option>`
          ).join("")}
        </select>
      </p>
      <p>
        it is enjoyed in the
        <select name="styling" id="styling">
          ${this.settings.styles?.map(style =>
            `<option value="${style}">${style}</option>`
          ).join("")}
        </select>
        styling
      </p>
    `;
    document.querySelector('main')?.insertAdjacentElement('beforeend', settingsSection);
    document.querySelector('.completed-toggle').addEventListener('click', this.toggleCompleted.bind(this));
    StyleSwitcher.init();
  }

  paintNav(boards) {
    console.log(boards);
  }

  paintBoard(board) {
    console.log(board);
  }


  // utility
  toggleCompleted(e) {
    if (this.settings.completedVisibility === 'show') {
      this.settings.completedVisibility = 'hide';
      document.querySelector('main').classList.replace('completed-visible', 'completed-hidden');
    } else {
      this.settings.completedVisibility = 'show';
      document.querySelector('main').classList.replace('completed-hidden', 'completed-visible');
    }

    e.target.innerHTML = this.settings.completedVisibility;
  }
}
