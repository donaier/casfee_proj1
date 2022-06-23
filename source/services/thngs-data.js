import Datastore from  "@seald-io/nedb";

class ThngsData {
  constructor() {
    this.dbBoard = new Datastore({filename: './source/data/boards.db', autoload: true});
    this.dbList = new Datastore({filename: './source/data/lists.db', autoload: true});
    this.dbItems = new Datastore({filename: './source/data/items.db', autoload: true});
  }

  // boards
  getBoards(callback) {
    this.dbBoard.loadDatabase();

    this.dbBoard.find({}, (error, boards) => {
      callback(error, boards);
    })
  }

  addBoard(name, defaultBoard, callback) {
    this.dbBoard.insert({name, default: defaultBoard}, (error, newBoard) => {
      callback(error, newBoard);
    });
  }

  // lists
  getLists(board, callback) {
    this.dbList.loadDatabase();

    this.dbList.find({boardID: board}, (error, lists) => {
      callback(error, lists);
    })
  }

  addList(name, boardID, category, callback) {
    this.dbList.insert({name, boardID, category}, (error, newList) => {
      callback(error, newList);
    })
  }

  // items
  getItems(list, callback) {
    this.dbItems.loadDatabase();

    this.dbItems.find({listID: list}, (error, items) => {
      callback(error, items);
    })
  }

  addItem(text, listID, completed, importance, dueAt, callback) {
    this.dbItems.insert({text, listID, completed, importance, dueAt, createdAt: Date.now()}, (error, newItem) => {
      callback(error, newItem);
    })
  }

}

export default new ThngsData();
