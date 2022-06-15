import Datastore from  "@seald-io/nedb";

class Thngs {
  constructor() {
    this.db = new Datastore({filename: './source/data/boards.db', autoload: true});
  }

  getBoards(callback) {
    this.db.loadDatabase();

    this.db.find({}, (error, boards) => {
      callback(error, boards);
    })
  }

  addBoard(name, defaultBoard, callback) {
    this.db.insert({name, default: defaultBoard}, (error, newBoard) => {
      callback(error, newBoard);
    });
  }

}

export default new Thngs();
