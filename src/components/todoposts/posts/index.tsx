import styled from 'styled-components';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { RootState } from '../../../store';
import { completeTodo, deleteTodo, endDeleteTodo } from '../../../store/todoSlice';

interface StyledTaskType {
  completed: boolean;
  deleted: boolean;
}
const Task = styled.div<StyledTaskType>`
  display: flex;
  height: auto;
  width: 100%;
  background-color: ${(props) => {
    if (props.completed && props.deleted === false) {
      return '#00ff044b;';
    }
    if (props.deleted) {
      return '#ff7979;';
    }
    return '#DCDFB2;';
  }};
  border-radius: 15px;
  border: 2px solid;
  border-color: #646464;
  align-items: center;
  margin: 1em auto 0 auto;
  height: auto;
  width: auto;
  max-width: 95%;
  word-wrap: break-word;
  padding: 1em;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export function Posts() {
  const dispatch = useAppDispatch();
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);
  const todos = useAppSelector((state: RootState) => state.todos.todos).filter((todo) => todo.sort === sortValue);
  const selectValue = useAppSelector((state: RootState) => state.setSelect.selectValue);

  const filteredTodos = () => {
    if (selectValue === 'All') {
      return todos;
    }
    if (selectValue === 'Completed') {
      return todos.filter((todo) => todo.completed === true && todo.deleted === false);
    }
    if (selectValue === 'Deleted') {
      return todos.filter((todo) => todo.completed === true && todo.deleted === true);
    }
    return null;
  };
  const filteredTodoList = filteredTodos();

  return (
    <div>
      {filteredTodoList === null ? (
        <Typography variant="h5" color="darkred" align="center" sx={{ marginBottom: 1, marginTop: 23 }}>
          Select the &quot;All&quot; type and add a task
        </Typography>
      ) : null}

      {filteredTodoList !== null && !sortValue ? (
        <Typography variant="h5" color="darkred" align="center" sx={{ marginBottom: 1, marginTop: 23 }}>
          Create or select a category
        </Typography>
      ) : null}

      {filteredTodoList !== null && sortValue && todos.length === 0 ? (
        <Typography variant="h5" color="darkred" align="center" sx={{ marginBottom: 1, marginTop: 23 }}>
          Create a task
        </Typography>
      ) : null}

      {filteredTodoList &&
        filteredTodoList.map((todo) => (
          <Task key={todo.id} completed={todo.completed} deleted={todo.deleted}>
            <div>
              {todo.deleted === false ? (
                <IconButton
                  color={todo.completed ? 'success' : 'primary'}
                  aria-label="add an alarm"
                  onClick={() => {
                    dispatch(completeTodo(todo.id));
                  }}
                >
                  <AssignmentTurnedInIcon />
                </IconButton>
              ) : null}

              {todo.completed ? (
                <IconButton
                  color="primary"
                  aria-label="add an alarm"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    todo.deleted === true ? dispatch(endDeleteTodo(todo.id)) : dispatch(deleteTodo(todo.id));
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
