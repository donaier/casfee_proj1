import express from 'express';
import router from './source/routes/todo-routes.js';

const app = express();
const port = 3000;

app.use(router);
app.use(express.static('./source/public'));

// root path
app.get("/", (req, res) => {res.sendFile(`${__dirname}/public/index.html`)});

app.listen(port, () => {});
