import getBoards from "../data/boards.js";
import getLists from "../data/lists.js"

import Painter from "./Painter.js";

export default class Thngs {
  constructor() {
    this.painter = new Painter({
      completedVisibility: 'hide',
      styles: ['flat', 'fancy'],
      orderOptions: [
        {value: 'name_asc', label: 'Name ASC'},
        {value: 'name_desc', label: 'Name DESC'},
        {value: 'due_asc', label: 'DueDate ASC'},
        {value: 'due_desc', label: 'DueDate DESC'},
        {value: 'created_asc', label: 'CreationDate ASC'},
        {value: 'created_desc', label: 'CreationDate DESC'},
        {value: 'importance_asc', label: 'Importance ASC'},
        {value: 'importance_desc', label: 'Importance DESC'},
      ]
    })

    this.boards = getBoards();
    this.activeBoard = this.boards.default;


    this.listContainer = document.querySelector('main .lists');
    this.completedVisibility = 'hide';

    // StyleSwitcher.init();

    this.buildNav();


  }

  initListeners() {
    document.querySelector('.add').addEventListener('click', () => {document.querySelector('#new-item').showModal()})

    // to painter - nav
    document.querySelector('nav').addEventListener('click', (e) => { this.switchBoard(e.target); })
  }

  buildNav() {
    const nav = document.querySelector('nav');
    // build nav
    this.boards.boards.forEach(board => {
      const navLink = document.createElement('button');

      navLink.innerText = board;
      if (board === this.activeBoard) { navLink.classList.add('active') };

      nav.appendChild(navLink)
    });

    this.loadLists(this.activeBoard);
  }

  switchBoard(navLink) {
    document.querySelectorAll('nav button.active').forEach(btn => btn.classList.remove('active'));
    navLink.classList.add('active');

    this.loadLists(navLink.innerText);
  }

  loadLists(board) {
    this.listContainer.innerHTML = '';

    getLists(board).forEach(list => {
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
        </section>
      `)
    });
  }
}
