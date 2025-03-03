import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_COLUMNS } from '../../constants/initialColumns';

export interface Column {
    id: string;
    title: string;
    color: string;
}

interface ColumnsState {
    columns: Column[];
}

const initialState: ColumnsState = {
    columns: INITIAL_COLUMNS,
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
