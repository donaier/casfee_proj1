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

    this.boards = null;

    // this.activeBoard = this.boards.default;
    // this.ordering = document.querySelector('#ordering')?.value;
    // this.lists = [];
    // this.createForm = document.querySelector('form#create-item');

    // document.querySelector('#new-item button[type="submit"]').addEventListener('click', this.createItem.bind(this));
    // document.querySelector('#ordering').addEventListener('change', this.setOrdering.bind(this));
    // document.querySelector('.add').addEventListener('click', () => {
    //   this.createForm.querySelector('input[name="list"').value = '';
    //   document.querySelector('#new-item h3').textContent = '';
    //   document.querySelector('#new-item').showModal();
    // });
  }

  async buildNav() {
    const response = await fetch("/boards");

    if (response.ok) {
      this.boards = await response.json();
    }

    this.painter.paintNav(this.boards);
    this.painter.nav.addEventListener('click', this.switchBoard.bind(this));
  }

  buildBoard() {
    // this.lists = getLists(this.activeBoard, this.ordering);
    // this.painter.paintBoard(this.lists);

    // document.querySelectorAll('.add.list-add').forEach(addBtn =>
    //   addBtn.addEventListener('click', (e) => {
    //     this.createForm.querySelector('input[name="list"').value = e.target.closest('.add').dataset.list;
    //     document.querySelector('#new-item h3').textContent = e.target.closest('.add').dataset.list;
    //     document.querySelector('#new-item').showModal();
    //   })
    // );
  }

  switchBoard(e) {
    if (e.target.nodeName === 'BUTTON') {
      document.querySelectorAll('nav button.active').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      this.activeBoard = e.target.innerText;
      this.buildBoard();
    }
  }

  // setOrdering(e) {
  //   this.ordering = e.target.value;
  //   this.buildBoard();
  // }

  // // item creation
  // createItem(e) {
  //   if (this.createForm.querySelector('input[type="text"]').value.trim()) {
  //     const data = new FormData(this.createForm);
  //     const newItem = {
  //       board: this.board,
  //       list: data.get('list'),
  //       item: {
  //         text: data.get('text'),
  //         due_at: data.get('due_at'),
  //         importance: data.get('importance')
  //       }
  //     };

  //     // save newItem somehow :) and then maybe buildBoard() again
  //   } else {
  //     e.preventDefault();
  //     this.createForm.classList.add('invalid');
  //   }
  // }
}
