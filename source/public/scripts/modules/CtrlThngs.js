import Thngs from "./SrvsThngs.js";
import Painter from "./ViewPainter.js";

export default class CtrlThngs {
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

    document.querySelector('#ordering').addEventListener('change', this.setOrdering.bind(this));
  }

  async initialize() {
    this.thng = new Thngs();

    this.painter.paintNav(await this.thng.getNav());
    this.painter.nav.addEventListener('click', this.switchBoard.bind(this));
    this.buildBoard(this.thng.activeBoard)

    // new list
    this.painter.boardAdd.addEventListener('click', (e) => {
      this.painter.showNewListForm(e.target.closest('.add'));
    });

    // forms submit
    this.painter.createListForm.querySelector('button[type="submit"]').addEventListener('click', this.submitListForm.bind(this));
    this.painter.createForm.querySelector('button[type="submit"]').addEventListener('click', this.submitItemForm.bind(this));
    this.painter.editForm.querySelector('button[type="submit"]').addEventListener('click', this.submitEditItemForm.bind(this))
    this.painter.listContainer.addEventListener('click', this.handleItemClick.bind(this));
  }

  async buildBoard() {
    this.painter.paintBoard(await this.thng.getLists());
    this.thng.lists.forEach(list => {
      this.buildList(list._id);
    });

    this.painter.boardAdd.dataset.board = this.thng.activeBoard._id;
    this.painter.boardAdd.dataset.name = this.thng.activeBoard.name;

    // new item
    document.querySelectorAll('.add.list-add').forEach(addBtn =>
      addBtn.addEventListener('click', (e) => {
        this.painter.showNewItemForm(e.target.closest('.add'));
      })
    );
  }

  async buildList(listID) { 
    const items = await this.thng.getListItems(listID);
    this.painter.paintList(listID, items, this.ordering);
  }

  // event handlers
  switchBoard(e) {
    if (e.target.nodeName === 'BUTTON') {
      this.thng.activeBoard = this.thng.boards.find((board) => board.name === e.target.innerText);

      this.painter.updateNav(e.target)
      this.buildBoard();
    }
  }

  setOrdering(e) {
    this.ordering = e.target.value;
    this.buildBoard();
  }

  handleItemClick(e) {
    if (e.target.classList.contains('edit-icon')) {
      // edit form
      const itemLi = e.target.closest('li');
      this.painter.editForm.querySelector('input[name="listID"]').value = itemLi.dataset.id;
      this.painter.editForm.querySelector('input[name="itemID"]').value = itemLi.dataset.id;
      this.painter.editForm.querySelector('input[name="text"]').value = itemLi.dataset.text;
      this.painter.editForm.querySelector('input[name="due_at"]').value = itemLi.dataset.dueAt;
      this.painter.editForm.querySelector('input[name="importance"]').value = itemLi.dataset.importance;

      document.querySelector('#edit-item-dialog').showModal();
    } else if (
      // complete item
      e.target.closest('li')
      &&
      e.target.closest('li').classList.contains('actual-todo-item')
      &&
      e.target.closest('li').dataset.completed === 'false'
    ) {
      this.thng.completeItem(e.target.closest('li'))
    }
  }

  async submitListForm(e) {
    if (this.painter.createListForm.querySelector('input[type="text"]').value.trim()) {
      const formData = new FormData(this.painter.createListForm);

      const newList = {
        boardID: formData.get('boardID'),
        name: formData.get('name'),
        category: formData.get('category')
      }
      await this.thng.createList(newList.boardID, new URLSearchParams(newList))

      this.buildBoard();

      this.painter.createListForm.reset();
    } else {
      e.preventDefault();
      this.painter.createListForm.classList.add('invalid');
    }
  }

  async submitItemForm(e) {
    if (this.painter.createForm.querySelector('input[type="text"]').value.trim()) {
      const formData = new FormData(this.painter.createForm);

      const newItem = {
        listID: formData.get('listID'),
        text: formData.get('text'),
        due_at: formData.get('due_at'),
        importance: formData.get('importance')
      };
      await this.thng.createItem(newItem.listID, new URLSearchParams(newItem));

      this.buildBoard();

      this.painter.createForm.reset();
    } else {
      e.preventDefault();
      this.painter.createForm.classList.add('invalid');
    }
  }

  async submitEditItemForm(e) {
    if (this.painter.editForm.querySelector('input[type="text"]').value.trim()) {
      const formData = new FormData(this.painter.editForm);

      const editedItem = {
        listID: formData.get('listID'),
        text: formData.get('text'),
        due_at: formData.get('due_at'),
        importance: formData.get('importance')
      };
      await this.thng.updateItem(formData.get('itemID'), editedItem.listID, new URLSearchParams(editedItem));

      this.buildBoard();

      this.painter.editForm.reset();
    } else {
      e.preventDefault();
      this.painter.editForm.classList.add('invalid');
    }
  }
}
