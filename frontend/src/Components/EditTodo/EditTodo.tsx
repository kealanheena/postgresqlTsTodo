import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import TodoInterface from '../../Interfaces/TodoInterface';
import TodosStateInteface from '../../Interfaces/TodosStateInterface'

interface EditTodoProps {
  todo: TodoInterface;
  todosState: TodosStateInteface;
}

const EditTodo = (props: EditTodoProps) => {
  const { todo, todosState } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [descriptionEdit, setDesptionnEdit] = useState<string>(todo.description);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDesptionnEdit(e.target.value);
  }

  const onOpen = () :void => {
    setOpen(true);
  };

  const onClose = () :void => {
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();

    try {
      const body: { description: string } = { description: descriptionEdit };
      const route = `http://localhost:8080/todos/${todo.todo_id}`;

      const response = await fetch(route, {
        method: 'put',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: TodoInterface = await response.json();

      todosState.set(
        todosState
          .value
          .map(
            (todoState) => todo.todo_id !== todoState.todo_id ? todoState : { todo_id: todoState.todo_id, description: descriptionEdit }
          )
      )

      setOpen(false);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Somethig went wrong!');
      }
    }
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={() => onOpen()}>Edit</Button>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogTitle>
              Make a changeto  your todo.
            </DialogTitle>
              <TextField
                onChange={onChange}
                id="todo-description-edit"
                label="Edit Description"
                value={descriptionEdit}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Edit Todo</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTodo;
