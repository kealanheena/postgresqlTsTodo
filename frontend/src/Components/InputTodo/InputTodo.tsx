import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TodoInterface from '../../Interfaces/TodoInterface';

const InputTodo = () => {
  const [description, setDescription] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    setIsDisabled(true);
    e.preventDefault();

    try {
      const body: { description: string } = { description };
      const route = 'http://localhost:8080/todos';

      const response = await fetch(route, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: TodoInterface = await response.json();

      setDescription('');

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Somethig went wrong!');
      }
    }
    setIsDisabled(false);
  }

  return (
    <div>
      <Typography variant="h1" component="h2">
        Pern Todo List
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={10} style={{ margin: '0' }}>
            <TextField
              onChange={onChange}
              id="todo-description"
              label="Todo Description"
              value={description}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button 
              style={
                { height: '100%', width: '100%' }
              }
              disabled={isDisabled}
              type="submit"
              variant="contained"
            >Add Todo</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default InputTodo;
