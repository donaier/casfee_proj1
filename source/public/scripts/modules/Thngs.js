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
        {value: 'created_desc', label: 'CreationDate DESC', default: true},
        {value: 'importance_asc', label: 'Importance ASC'},
        {value: 'importance_desc', label: 'Importance DESC'},
      ]
    })

    this.ordering = document.querySelector('#ordering')?.value;
    this.createForm = document.querySelector('form#create-item');
    this.createListForm = document.querySelector('form#create-list');
    this.lists = [];
    this.items = [];
    
    document.querySelector('#ordering').addEventListener('change', this.setOrdering.bind(this));

    document.querySelector('#new-item button[type="submit"]').addEventListener('click', this.createItem.bind(this));
    document.querySelector('#new-list button[type="submit"]').addEventListener('click', this.createList.bind(this));
    document.querySelector('.lists').addEventListener('click', this.handleItemClick.bind(this));
  }

  async buildNav() {
    const response = await fetch("/boards");

    if (response.ok) {
      this.boards = await response.json();
      this.activeBoard = this.boards.find((board) => board.default);
    }

    this.painter.paintNav(this.boards);
    this.painter.nav.addEventListener('click', this.switchBoard.bind(this));

    this.buildBoard();
  }

  async buildBoard() {
    const lists = await fetch(`/${this.activeBoard._id}/lists`);

    if (lists.ok) { this.lists = await lists.json(); }

    this.painter.paintBoard(this.lists);

    this.lists.forEach(list => {
      this.buildList(list._id);
    });

    document.querySelector('.add.board-add').dataset.board = this.activeBoard._id;
    document.querySelector('.add.board-add').dataset.name = this.activeBoard.name;

    // new list
    document.querySelector('.add.board-add').addEventListener('click', (e) => {
      this.createListForm.querySelector('input[name="boardID"').value = e.target.closest('.add').dataset.board;
      document.querySelector('#new-list h3').textContent = e.target.closest('.add').dataset.name;
      document.querySelector('#new-list').showModal();
    });
    // new item
    document.querySelectorAll('.add.list-add').forEach(addBtn =>
      addBtn.addEventListener('click', (e) => {
        this.createForm.querySelector('input[name="listID"').value = e.target.closest('.add').dataset.list;
        document.querySelector('#new-item h3').textContent = e.target.closest('.add').dataset.name;
        document.querySelector('#new-item').showModal();
      })
    );
  }

  async buildList(listID) {
    const items = await fetch(`/${listID}/items`);

    if (items.ok) { this.items[listID] = await items.json() }

    this.painter.paintList(listID, this.items[listID], this.ordering);
  }

  switchBoard(e) {
    if (e.target.nodeName === 'BUTTON') {
      document.querySelectorAll('nav button.active').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      this.activeBoard = this.boards.find((board) => board.name === e.target.innerText);
      this.buildBoard();
    }
  }

  setOrdering(e) {
    this.ordering = e.target.value;
    this.buildBoard();
  }

  handleItemClick(e) {
    if (e.target.classList.contains('edit-icon')) {
      document.querySelector('#edit-item').showModal();
      // fill form, save/update
    } else if (
      e.target.closest('li')
      &&
      e.target.closest('li').classList.contains('actual-todo-item')
      &&
      e.target.closest('li').dataset.completed === 'false'
    ) {
      Thngs.completeItem(e.target.closest('li'))
    }
  }

  static async completeItem(item) {
    const isCompleted = await fetch(`/complete/${item.dataset.id}`);

    if (isCompleted.ok) {
     item.dataset.completed = true;
    }
  }

  // list creation
  async createList(e) {
    if (this.createListForm.querySelector('input[type="text"]').value.trim()) {
      const formData = new FormData(this.createListForm);

      const newList = {
        boardID: formData.get('boardID'),
        name: formData.get('name'),
        category: formData.get('category')
      }
      const urlparams = new URLSearchParams(newList);
      const createdList = await fetch(`/${formData.get('boardID')}/lists?${urlparams}`, {method: 'post'});

      if (createdList.ok) {
        this.buildBoard();
        this.createListForm.reset();
      }
    } else {
      e.preventDefault();
      this.createListForm.classList.add('invalid');
    }
  }

  // item creation
  async createItem(e) {
    if (this.createForm.querySelector('input[type="text"]').value.trim()) {
      const formData = new FormData(this.createForm);

      const newItem = {
        listID: formData.get('listID'),
        text: formData.get('text'),
        due_at: formData.get('due_at'),
        importance: formData.get('importance')
      };
      const urlparams = new URLSearchParams(newItem);
      const createdItem = await fetch(`/${formData.get('listID')}/items?${urlparams}`, {method: 'post'});

      if(createdItem.ok) {
        this.buildBoard();
        this.createForm.reset();
      }
    } else {
      e.preventDefault();
      this.createForm.classList.add('invalid');
    }
  }
}
