import styled from 'styled-components';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { RootState } from '../../../store';
import { backCompleteTodo, completeTodo, deleteTodo } from '../../../store/todoSlice';

interface StyledTaskType {
  completed: boolean;
}

const Task = styled.div<StyledTaskType>`
  display: flex;
  width: 100%;
  max-width: 60%;
  background-color: #adfcb1;
  border-radius: 25px;
  align-items: center;
  margin: 1em auto 0 auto;
  height: auto;
  word-wrap: break-word;
  padding: 1em;
`;

export function ComplatePosts() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.complateTodos);
  return (
    <div>
      {todos.length === 0 ? <h2>Posts not found</h2> : <h2>Posts</h2>}
      {todos.map((todo) => (
        <Task key={todo.id} completed={todo.completed}>
          <div>
            <IconButton
              color={todo.completed ? 'success' : 'primary'}
              aria-label="add an alarm"
              onClick={() => {
                dispatch(backCompleteTodo(todo.id));
              }}
            >
              <AssignmentTurnedInIcon />
            </IconButton>

            {todo.completed ? (
              <IconButton
                color="primary"
                aria-label="add an alarm"
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            ) : null}
          </div>
          <p>{todo.text}</p>
        </Task>
      ))}
    </div>
  );
}
