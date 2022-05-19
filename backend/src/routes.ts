import { Router, Request, Response } from 'express';
import { QueryResult } from 'pg';

import pool from './database/db';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World' });
});

// CREATE A TODO
routes.post('/todos', async (req: Request, res: Response) => {
  try {
    const { description }: { description: string } = req.body;

    const newTodo: QueryResult = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// GET ALL TODOS
routes.get('/todos', async (req: Request, res: Response) => {
  try {
    const allTodos: QueryResult = await pool.query(
      'SELECT * FROM todo'
    );

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET A TODO
routes.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const todo: QueryResult = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [id]
    );

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE A TODO
routes.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description }: { description: string } = req.body;

    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    
    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE A TODO
routes.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    )
    
    res.json('Todo was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

export default routes;