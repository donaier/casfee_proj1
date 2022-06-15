import express from 'express';
import * as todoController from '../controllers/todo-controller.js';
import * as listsController from '../controllers/list-controller.js'

const router = express.Router();

router.get("/boards", todoController.getBoards);
router.post("/boards", todoController.createBoard);
router.get("/:board/lists", listsController.getLists);

export default router;
