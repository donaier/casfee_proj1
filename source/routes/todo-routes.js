import express from 'express';
import * as todoController from '../controllers/todo-controller.js';

const router = express.Router();

router.get("/boards", todoController.getBoards);
router.post("/boards", todoController.createBoard);
router.get("/:boardID/lists", todoController.getLists);
router.post("/:boardID/lists", todoController.createList);
router.get("/:listID/items", todoController.getItems);
router.post("/:listID/items", todoController.createItem);
router.get("/complete/:itemID", todoController.completeItem);
router.get("/edit/:itemID", todoController.editItem);

export default router;
