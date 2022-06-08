import StyleSwitcher from "./StyleSwitcher.js";

export default class Painter {
  constructor(settings) {
    this.settings = settings;

    this.main = document.querySelector('main');
    this.nav = document.querySelector('nav');
    this.listContainer = document.querySelector('main .lists');

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
    this.main.insertAdjacentElement('beforeend', settingsSection);
    document.querySelector('.completed-toggle').addEventListener('click', this.toggleCompletedVisibility.bind(this));
    StyleSwitcher.init();
  }

  paintNav(boards) {
    boards.boards.forEach(board => {
      const navLink = document.createElement('button');

      navLink.innerText = board;
      if (board === boards.default) { navLink.classList.add('active') };
      this.nav.appendChild(navLink)
    });
  }

  paintBoard(lists) {
    this.listContainer.innerHTML = '';
    lists.forEach(list => {
      this.listContainer.insertAdjacentHTML('beforeend', `
        <section>
          ${ (list.category && list.title) ? `<h1><span>${list.category}</span>${list.title}</h1>` : '<h2></h2>' }
          <ul>
            ${list.items?.map(item =>
              `<li data-importance="${item.importance}" data-due-at="${item.due_at}" ${item.completed ? 'data-completed="true"' : ''}>
                ${item.text}${item.due_at ? `<span>${item.due_at}</span>` : ''}
              </li>`
            ).join("")}
          </ul>
          ${list.title ? `<div class="add list-add" data-list="${list.title}"><span>&times;</span></div>` : ''}
        </section>
      `)
    });
  }

  toggleCompletedVisibility(e) {
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
