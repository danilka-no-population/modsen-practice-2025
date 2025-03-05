/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';
import { HuePicker } from 'react-color';

import { CancelButton, SaveButton, TaskCount } from '#components/Column/styled';

import {
    AddButtonsContainer,
    AddColumnHeader,
    AddColumnTitle,
    AddColumnWrapper,
    ColorWrapper,
} from './styled';

interface AddColumnFormProps {
    newColumnTitle: string;
    newColumnColor: string;
    handleAddColumn: () => void;
    handleCancel: () => void;
    handleColumnTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChange: (color: { hex: string }) => void;
}

const AddColumnForm = forwardRef<HTMLDivElement, AddColumnFormProps>(
    (
        {
            newColumnTitle,
            newColumnColor,
            handleAddColumn,
            handleCancel,
            handleColumnTitleChange,
            handleColorChange,
        },
        ref
    ) => {
        return (
            <AddColumnWrapper ref={ref}>
                <AddColumnHeader color={newColumnColor}>
                    <TaskCount color={newColumnColor}>0</TaskCount>
                    <AddColumnTitle
                        type="text"
                        placeholder="Column title..."
                        value={newColumnTitle}
                        onChange={handleColumnTitleChange}
                    />
                </AddColumnHeader>
                <ColorWrapper>
                    <HuePicker
                        color={newColumnColor}
                        onChangeComplete={handleColorChange}
                        width="100%"
                    />
                </ColorWrapper>
                <AddButtonsContainer>
                    <SaveButton
                        onClick={handleAddColumn}
                        disabled={newColumnTitle.trim() === ''}
                    >
                        Save
                    </SaveButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </AddButtonsContainer>
            </AddColumnWrapper>
        );
    }
);

export default AddColumnForm;
