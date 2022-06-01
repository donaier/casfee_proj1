import getBoards from "../data/boards.js";
import getLists from "../data/lists.js"
import StyleSwitcher from "./StyleSwitcher.js";

export default class Thngs {
  constructor() {
    this.boards = getBoards();
    this.activeBoard = this.boards.default;
    this.listContainer = document.querySelector('main .lists');
    this.completedVisibility = 'hide';

    StyleSwitcher.init();

    this.buildNav();
  }

  initListeners() {
    document.querySelector('#styling').addEventListener('change', (e) => StyleSwitcher.switch(e.target.value));
    document.querySelector('.add').addEventListener('click', () => {document.querySelector('#new-item').showModal()})
    document.querySelector('.completed-toggle').addEventListener('click', this.toggleCompleted);
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
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    navLink.classList.add('active');

    this.loadLists(navLink.innerText);
  }

  loadLists(board) {
    this.listContainer.innerHTML = '';

    getLists(board).forEach(list => {
      this.listContainer.insertAdjacentHTML('afterbegin', `
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

  toggleCompleted(e) {
    const toggle = e.target;
  
    if (this.completedVisibility === 'show') {
      this.completedVisibility = 'hide';
      document.querySelector('main').classList.replace('completed-visible', 'completed-hidden');
    } else {
      this.completedVisibility = 'show';
      document.querySelector('main').classList.replace('completed-hidden', 'completed-visible');
    }
  
    toggle.innerHTML = this.completedVisibility;
  }
}
