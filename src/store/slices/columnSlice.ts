import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_COLUMNS } from '../../constants/initialColumns';
import { Column, ColumnsState } from '../../types/columnTypes';

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
        updateColumn: (state, action: PayloadAction<Column>) => {
            const columnIndex = state.columns.findIndex(
                (col) => col.id === action.payload.id
            );
            if (columnIndex !== -1) {
                state.columns[columnIndex] = action.payload;
            }
        },
    },
});

export const { addColumn, removeColumn, reorderColumns, updateColumn } =
    columnsSlice.actions;
export default columnsSlice.reducer;
