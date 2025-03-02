import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Column {
    id: string;
    title: string;
    color: string;
}

interface ColumnsState {
    columns: Column[];
}

const initialState: ColumnsState = {
    columns: [
        { id: 'todo', title: 'To Do', color: '#4F46E5' },
        { id: 'in-progress', title: 'In Progress', color: '#F59E0B' },
        { id: 'done', title: 'Done', color: '#22C55E' },
    ],
};

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<Column>) => {
            state.columns.push(action.payload);
        },
        removeColumn: (state, action: PayloadAction<string>) => {
            state.columns = state.columns.filter(
                (col) => col.id !== action.payload
            );
        },
        reorderColumns: (state, action: PayloadAction<Column[]>) => {
            state.columns = action.payload;
        },
    },
});

export const { addColumn, removeColumn, reorderColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
