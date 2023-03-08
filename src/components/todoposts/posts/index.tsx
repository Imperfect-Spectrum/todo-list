import styled from 'styled-components';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { RootState } from '../../../store';
import { completeTodo, deleteTodo, endDeleteTodo } from '../../../store/todoSlice';

interface StyledTaskType {
  completed: boolean;
  deleted: boolean;
}
const Task = styled.div<StyledTaskType>`
  display: flex;
  background-color: ${(props) => {
    if (props.completed && props.deleted === false) {
      return '#00ff044b;';
    }
    if (props.deleted) {
      return '#ff7979;';
    }
    return '#DCDFB2;';
  }};
  border-radius: 10px;
  border: 2px solid;
  border-color: #646464;
  align-items: center;
  margin: 1em auto 0 auto;
  height: auto;
  width: auto;
  max-width: 95%;
  padding: 1em;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  p {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
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
      {!sortValue ? (
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          Select a category or create one
        </Typography>
      ) : null}
      {sortValue !== '' && filteredTodoList?.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
          }}
        >
          Posts not found. Add a post!
        </Typography>
      ) : null}
      {filteredTodoList &&
        filteredTodoList.map((todo) => (
          <Task key={todo.id} completed={todo.completed} deleted={todo.deleted}>
            {todo.deleted === false ? (
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Checkbox
                    aria-label="Checkbox"
                    color="success"
                    onClick={() => {
                      dispatch(completeTodo(todo.id));
                    }}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
                  />
                </Box>
              </Box>
            ) : null}

            <Box sx={{ display: 'flex', marginRight: 'auto' }}>
              <Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
                {todo.text}
              </Typography>
            </Box>

            {todo.completed ? (
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  color="primary"
                  aria-label="add an alarm"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    todo.deleted === true ? dispatch(endDeleteTodo(todo.id)) : dispatch(deleteTodo(todo.id));
                  }}
                >
                  <ClearOutlinedIcon sx={{ fontSize: 35, color: 'red' }} />
                </IconButton>
              </Box>
            ) : null}
          </Task>
        ))}
    </div>
  );
}
