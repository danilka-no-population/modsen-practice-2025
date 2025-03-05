import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '#hooks/typedReduxHooks';
import { addColumn } from '#store/slices/columnSlice';

// eslint-disable-next-line no-unused-vars
export const useAddColumn = (setIsAddingColumn: (value: boolean) => void) => {
    const dispatch = useAppDispatch();

    const [newColumnTitle, setNewColumnTitle] = useState<string>('');
    const [newColumnColor, setNewColumnColor] = useState<string>('#8A8A8A');

    const handleAddColumn = () => {
        if (newColumnTitle.trim() !== '') {
            dispatch(
                addColumn({
                    id: uuidv4(),
                    title: newColumnTitle,
                    color: newColumnColor,
                })
            );
            setIsAddingColumn(false);
            setNewColumnTitle('');
            setNewColumnColor('#8A8A8A');
        }
    };

    const handleCancel = () => {
        setIsAddingColumn(false);
        setNewColumnTitle('');
        setNewColumnColor('#8A8A8A');
    };

    const handleColumnTitleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewColumnTitle(e.target.value);
    };

    const handleColorChange = (color: { hex: string }) => {
        setNewColumnColor(color.hex);
    };

    return {
        newColumnTitle,
        newColumnColor,
        setNewColumnTitle,
        setNewColumnColor,
        handleAddColumn,
        handleCancel,
        handleColumnTitleChange,
        handleColorChange,
    };
};
