import Datastore from  "@seald-io/nedb";

class ThngsData {
  constructor() {
    this.dbBoard = new Datastore({filename: './source/data/boards.db', autoload: true});
    this.dbList = new Datastore({filename: './source/data/lists.db', autoload: true});
  }

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

  getLists(board, callback) {
    this.dbList.loadDatabase();

    this.dbList.find({boardID: board}, (error, lists) => {
      callback(error, lists);
    })
  }

  addlist(name, boardID, category, callback) {
    this.dbList.insert({name, boardID, category}, (error, newList) => {
      callback(error, newList);
    })
  }

}

export default new ThngsData();
