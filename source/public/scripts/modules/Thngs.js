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
    this.lists = [];
    this.createForm = document.querySelector('form#create-item');

    document.querySelector('.add').addEventListener('click', () => {document.querySelector('#new-item').showModal()})
    document.querySelector('#new-item button[type="submit"]').addEventListener('click', this.createItem.bind(this));
  }


  buildNav() {
    this.painter.paintNav(this.boards);
    this.painter.nav.addEventListener('click', this.switchBoard.bind(this));
  }

  buildBoard() {
    this.lists = getLists(this.activeBoard);
    this.painter.paintBoard(this.lists);
  }

  switchBoard(e) {
    if (e.target.nodeName === 'BUTTON') {
      document.querySelectorAll('nav button.active').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      this.activeBoard = e.target.innerText;
      this.buildBoard();
    }
  }

  setOrdering(e) {

  }

  // item creation
  createItem(e) {
    if (this.createForm.querySelector('input[type="text"]').value.trim()) {
      const data = new FormData(this.createForm);
      const newItem = {
        board: '',
        list: '',
        item: {
          text: data.get('text'),
          due_at: data.get('due_at'),
          importance: data.get('importance')
        }
      };

      // save newItem somehow :) and then maybe buildBoard() again

    } else {
      e.preventDefault();
      this.createForm.classList.add('invalid');
    }
  }
}
