import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import EditTodo from '../EditTodo/EditTodo';
import TodoInterface from '../../Interfaces/TodoInterface';
import TodosStateInteface from '../../Interfaces/TodosStateInterface';


interface ListTodosProps {
  todosState: TodosStateInteface;
}

const ListTodos = (props: ListTodosProps) => {
  const { todosState } = props;

  const onClickDelete = async (id: number): Promise<any> => {
    try {
      const route = `http://localhost:8080/todos/${id}`;

      const response = await fetch(route, {
        method: 'DELETE',
      });

      todosState.set(
        todosState.value.filter((todo) => todo.todo_id !== id)
      );

      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Somethig went wrong!');
      }
    }
  };

  useEffect(() => {
    const getTodos = async (): Promise<any> => {
      try {
        const route = 'http://localhost:8080/todos';
  
        const response = await fetch(route);
        const data: TodoInterface[] = await response.json();
  
        todosState.set(data);
  
        return data;
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Somethig went wrong!');
        }
      }
    }
    
    getTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todosState.value.map(({ todo_id, description }) => (
              <TableRow
                key={todo_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">{todo_id}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  <EditTodo 
                    todo={{
                      todo_id,
                      description
                    }} 
                    todosState={todosState}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => onClickDelete(todo_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListTodos;
