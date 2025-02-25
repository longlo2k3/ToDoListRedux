import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ToDo } from "../types/Todo.type";
import { initialToDoList } from "../constant/ToDo.constant";

interface ToDoState {
  todoList: ToDo[];
  editingPost: ToDo | null;
}

const initialState: ToDoState = {
  todoList: initialToDoList,
  editingPost: null,
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<ToDo>) => {
        const todo = action.payload;
        state.todoList.unshift(todo);
      },
      prepare: (todo: Omit<ToDo, "id">) => {
        return {
          payload: {
            ...todo,
            id: nanoid(),
          },
        };
      },
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const toDoId = action.payload;
      const foundExist =
        state.todoList.findIndex((state) => state.id === toDoId) || 0;
      if (foundExist !== -1) {
        state.todoList.splice(foundExist, 1);
      }
    },
    startEditTodo: (state, action: PayloadAction<string>) => {
      const toDoId = action.payload;
      const foundExist =
        state.todoList.find((state) => state.id === toDoId) || null;
      state.editingPost = foundExist;
    },

    finishEditToDo: (state, action: PayloadAction<ToDo>) => {
      const toDoId = action.payload.id;
      state.todoList.map((item, index) => {
        if (item.id === toDoId) {
          state.todoList[index] = action.payload;
        }
      });
    },
    deleteMultiple: (state, action: PayloadAction<string[]>) => {
      const todoIds = action.payload;
      state.todoList = state.todoList.filter(
        (todo) => !todoIds.includes(todo.id)
      );
    },
  },
  selectors: {
    selectTodos: (state: ToDoState) => state.todoList,
    selectEditingPost: (state: ToDoState) => state.editingPost,
  },
});

export const {
  addTodo,
  deleteTodo,
  startEditTodo,
  finishEditToDo,
  deleteMultiple,
} = toDoSlice.actions;

export const { selectTodos, selectEditingPost } = toDoSlice.selectors;
export default toDoSlice.reducer;
