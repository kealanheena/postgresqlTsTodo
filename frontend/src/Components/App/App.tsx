import React, { useState } from 'react';
import Container from '@mui/material/Container';

import InputTodo from '../InputTodo/InputTodo';
import ListTodos from '../ListTodos/ListTodos';
import TodoInterface from '../../Interfaces/TodoInterface';
import TodosStateInteface from '../../Interfaces/TodosStateInterface';

const App = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  const todosState: TodosStateInteface = {
    value: todos,
    set: setTodos,
  }

  return (
    <Container>
      <InputTodo />
      <ListTodos todosState={todosState} />
    </Container>
  );
}

export default App;
