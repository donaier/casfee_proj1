import thngs from "../services/thngs.js";

export function getBoards(request, response) {
  thngs.getBoards((error, boards) => {
    if (!error) {
      response.json(boards);
    } else {
      response.json(error);
    }
  })
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
