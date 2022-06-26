export default class Thngs {
  constructor() {
    this.lists = [];
    this.items = [];    
  }

  async getNav() {
    const response = await fetch("/boards");

    if (response.ok) {
      this.boards = await response.json();
      this.activeBoard = this.boards.find((board) => board.default);

      return this.boards;
    }
    return null;
  }

  async getLists() {
    const lists = await fetch(`/${this.activeBoard._id}/lists`);

    if (lists.ok) { 
      this.lists = await lists.json();

      return this.lists;
    }
    return null;
  }

  async getListItems(listID) {
    const items = await fetch(`/${listID}/items`);

    if (items.ok) {
      this.items[listID] = await items.json();

      return this.items[listID];
    }
    return null;
  }

  async completeItem(item) {
    const isCompleted = await fetch(`/complete/${item.dataset.id}`);
    const listID = item.closest('section').dataset.listId
    if (isCompleted.ok) {
      this.items[listID] = this.items[listID].filter(i => i._id !== item.dataset.id);
      item.dataset.completed = true;
    }
  }

  async createList(boardID, params) {
    const createdList = await fetch(`/${boardID}/lists?${params}`, {method: 'post'});

    if (createdList.ok) {
      this.lists.push(await createdList.json());
    }
  }

  async createItem(listID, params) {
    const createdItem = await fetch(`/${listID}/items?${params}`, {method: 'post'});

    if(createdItem.ok) {
      this.items[listID].push(await createdItem.json());
    }
  }

  async updateItem(itemID, listID, params) {
    const updatedItem = await fetch(`/edit/${itemID}/?${params}`, {});

    if(updatedItem.ok) {
      this.getListItems(listID)
    }
  }
}
