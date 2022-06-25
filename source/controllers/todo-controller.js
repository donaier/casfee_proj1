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
  thngs.addList(
    request.query.name,
    request.query.category,
    request.params.boardID,
    (error, newList) => {
    if (!error) {
      response.json(newList);
    } else {
      response.json(error);
    }
  })
}

export function getItems(request, response) {
  thngs.getItems(request.params.listID, (error, items) => {
    if (!error) {
      response.json(items);
    } else {
      response.json(error);
    }
  })
}

export function createItem(request, response) {
  thngs.addItem(
    request.query.text,
    request.params.listID,
    false,
    request.query.importance,
    request.query.due_at,
    (error, newItem) => {
      if (!error) {
        response.json(newItem);
      } else {
        response.json(error);
      }
    }
  )
}
