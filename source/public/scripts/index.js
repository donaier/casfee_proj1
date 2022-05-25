// einfach roh für die funktionalität
import getBoards from "./data/boards.js"
import getLists from "./data/lists.js"

function switchStyle(evnt) {
  const root = document.querySelector(':root');
  const styles = {
    'flat': {
      '--bg': '#212121',
      '--clr': '#CCC',
      '--clrBg': '#353535',
      '--clrComp': '#454545',
      '--clrCompLight': '#525252',
      '--clrLoud': '#FFF',
      '--clrAccent': '#F2565D',
      '--clrAccentDark': '#77383B'
    },
    'fancy': {
      '--bg': '#f1dca7',
      '--clr': '#222',
      '--clrBg': '#edd3c4',
      '--clrComp': '#e7bc91',
      '--clrCompLight': '#f5e4d3',
      '--clrLoud': '#0194fc',
      '--clrAccent': '#ff218e',
      '--clrAccentDark': '#fcd800'
    }
  }

  Object.entries(styles[evnt.target.value]).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}

function toggleCompleted(e) {
  const toggle = e.target;

  if (toggle.dataset.completed === 'show') {
    toggle.dataset.completed = 'hide';
    document.querySelector('main').classList.replace('completed-visible', 'completed-hidden');
  } else {
    toggle.dataset.completed = 'show';
    document.querySelector('main').classList.replace('completed-hidden', 'completed-visible');
  }

  toggle.innerHTML = toggle.dataset.completed;
}

function loadLists(board) {
  getLists(board).forEach(list => {
    document.querySelector('main').insertAdjacentHTML('afterbegin', `
      <section>
        <h1><span>${list.category}</span>${list.title}</h1>
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

function loadBoards() {
  let activeBoard = null;
  // build nav
  getBoards().boards.forEach(board => {
    const navLink = document.createElement('a');

    navLink.href = "";
    navLink.text = board;
    if (board === getBoards().default) {
      navLink.classList.add('active');
      activeBoard = board;
    }
    document.querySelector('nav').appendChild(navLink)
  });

  // load lists of selected board
  if (activeBoard) {
    loadLists(activeBoard);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // init
  switchStyle({target: {value: document.querySelector('#styling').value}})

  loadBoards();

  // listeners
  document.querySelector('#styling').addEventListener('change', switchStyle);
  document.querySelector('.add').addEventListener('click', () => {document.querySelector('#new-item').showModal()})
  document.querySelector('.completed-toggle').addEventListener('click', toggleCompleted);
});
