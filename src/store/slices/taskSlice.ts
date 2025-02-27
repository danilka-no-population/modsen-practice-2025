import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Priority {
    label: 'Low' | 'Medium' | 'High';
    color: string;
}

export interface Task {
    id: string;
    columnId: string;
    title: string;
    description: string;
    priority?: Priority;
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(
                (task) => task.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        moveTask: (
            state,
            action: PayloadAction<{ taskId: string; newColumnId: string }>
        ) => {
            const task = state.tasks.find(
                (task) => task.id === action.payload.taskId
            );
            if (task) {
                task.columnId = action.payload.newColumnId;
            }
        },
        reorderTasks: (
            state,
            action: PayloadAction<{ columnId: string; newOrder: string[] }>
        ) => {
            const { columnId, newOrder } = action.payload;
            const filteredTasks = state.tasks.filter(
                (task) => task.columnId !== columnId
            );
            const reorderedTasks = newOrder
                .map((id) => state.tasks.find((task) => task.id === id))
                .filter((task): task is Task => !!task);
            state.tasks = [...filteredTasks, ...reorderedTasks];
        },
    },
});

export const { addTask, removeTask, editTask, moveTask, reorderTasks } =
    tasksSlice.actions;
export default tasksSlice.reducer;
