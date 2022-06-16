import thngs from "../services/thngs-data.js";

// boards
export function getBoards(request, response) {
  thngs.getBoards((error, boards) => {
    if (!error) {
      response.json(boards);
    } else {
      response.json(error);
    }
  });
}

export function createBoard(request, response) {
  thngs.addBoard(request.query.name, request.query.isDefault, (error, newBoard) => {
    if (!error) {
      response.json(newBoard);
    } else {
      response.json(error);
    }
  });
}

// lists
export function getLists(request, response) {
  thngs.getLists(request.params.boardID, (error, lists) => {
    if (!error) {
      response.json(lists);
    } else {
      response.json(error);
    }
  })
}

export function createList(request, response) {
  thngs.addlist(request.query.name, request.params.boardID, request.query.category, (error, newList) => {
    if (!error) {
      response.json(newList);
    } else {
      response.json(error);
    }
  })
}
