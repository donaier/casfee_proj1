import StyleSwitcher from "./StyleSwitcher.js";

export default class Painter {
  constructor(settings) {
    this.settings = settings;
    
    this.main = document.querySelector('main');
    this.nav = document.querySelector('nav');
    this.listContainer = document.querySelector('main .lists');

    this.boardAdd = document.querySelector('.add.board-add');

    this.createForm = document.querySelector('form#create-item');
    this.editForm =  document.querySelector('form#edit-item');
    this.createListForm = document.querySelector('form#create-list');

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
            `<option value="${orderOption.value}" ${orderOption.default ? 'selected' : ''}>${orderOption.label}</option>`
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
    boards.forEach(board => {
      const navLink = document.createElement('button');

      navLink.innerText = board.name;
      if (board.default) { navLink.classList.add('active') };
      this.nav.appendChild(navLink)
    });
  }

  updateNav(newActive) {
    this.nav.querySelectorAll('button.active').forEach(btn => btn.classList.remove('active'));
    newActive.classList.add('active');
  }

  paintBoard(lists) {
    this.listContainer.innerHTML = '';
    lists.forEach(list => {
      this.listContainer.insertAdjacentHTML('beforeend', `
        <section id="list-${list._id}" data-list-id="${list._id}">
          ${ (list.category && list.name) ? `<h1><span>${list.category}</span>${list.name}</h1>` : '<h2></h2>' }
          ${list.name ? `<div class="add list-add" data-list="${list._id}" data-name="${list.name}">{<span>&times;</span>}</div>` : ''}
        </section>
      `)
    });
  }

  paintList(listID, items, ordering) {
    let orderedItems = [];
    switch (ordering) {
      case 'name_asc':
          orderedItems = items.sort((a,b) => a.text < b.text ? -1 : 1)
        break;
      case 'name_desc':
          orderedItems = items.sort((a,b) => a.text > b.text ? -1 : 1)
        break;
      case 'due_asc':
          orderedItems = items.sort((a,b) => !a.dueAt || a.dueAt > b.dueAt ? 1 : -1);
        break;
      case 'due_desc':
          orderedItems = items.sort((a,b) => !a.dueAt || a.dueAt < b.dueAt ? 1 : -1);
        break;
      case 'created_asc':
          orderedItems = items.sort((a,b) => a.createdAt < b.createdAt ? -1 : 1);
        break;
      case 'created_desc':
          orderedItems = items.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
        break;
      case 'importance_asc':
          orderedItems = items.sort((a,b) => a.importance < b.importance ? -1 : 1)
        break;
      case 'importance_desc':
          orderedItems = items.sort((a,b) => a.importance > b.importance ? -1 : 1)
        break;

      default:
        break;
    }

    this.listContainer.querySelector(`#list-${listID}`).insertAdjacentHTML('beforeend', `
      <ul>
      ${orderedItems.map(item =>
        `<li
          class="actual-todo-item"
          data-text="${item.text}"
          data-importance="${item.importance}"
          data-due-at="${item.dueAt}"
          data-id="${item._id}"
          data-completed="${item.completed}"
        >
          ${item.text}${item.dueAt ? `<span>${item.dueAt}</span>` : ''}
          <img src="/assets/edit.svg" class="edit-icon">
        </li>`
      ).join("")}
      </ul>
    `)
  }

  // dialog/modals
  showNewListForm(listAdd) {
    this.createListForm.querySelector('input[name="boardID"').value = listAdd.dataset.board;
    document.querySelector('#new-list-dialog h3').textContent = `${listAdd.dataset.name}:newList`;
    document.querySelector('#new-list-dialog').showModal();
  }

  showNewItemForm(itemAdd) {
    this.createForm.querySelector('input[name="listID"').value = itemAdd.dataset.list;
    document.querySelector('#new-item-dialog h3').textContent = itemAdd.dataset.name;
    document.querySelector('#new-item-dialog').showModal();
  }


  // settings actions
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
