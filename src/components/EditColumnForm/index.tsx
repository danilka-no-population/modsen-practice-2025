/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { HuePicker } from 'react-color';

import {
    AddButtonsContainer,
    AddColumnHeader,
    AddColumnTitle,
    CharCounter,
    ColorWrapper,
} from '#components/AddColumnForm/styled';
import { CancelButton, SaveButton, TaskCount } from '#components/Column/styled';

import { EditColumnWrapper } from './styled';

interface EditColumnFormProps {
    newColumnTitle: string;
    newColumnColor: string;
    handleAddColumn: () => void;
    handleCancel: () => void;
    handleColumnTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChange: (color: { hex: string }) => void;
    taskCount: number;
}

const EditColumnForm = forwardRef<HTMLDivElement, EditColumnFormProps>(
    (
        {
            newColumnTitle,
            newColumnColor,
            handleAddColumn,
            handleCancel,
            handleColumnTitleChange,
            handleColorChange,
            taskCount,
        },
        ref
    ) => {
        const titleInputRef = useRef<HTMLInputElement>(null);
        const isFirstClickTitle = useRef(true);
        const [isEditing, setIsEditing] = useState<boolean>(false);

        const handleTitleClick = () => {
            if (titleInputRef.current) {
                if (isFirstClickTitle.current) {
                    const length = titleInputRef.current.value.length;
                    titleInputRef.current.setSelectionRange(length, length);
                    titleInputRef.current.scrollLeft =
                        titleInputRef.current.scrollWidth;
                    isFirstClickTitle.current = false;
                }
            }
        };

        useEffect(() => {
            if (!isEditing) {
                setIsEditing(false);
                isFirstClickTitle.current = true;
            }
        }, [isEditing]);

        return (
            <EditColumnWrapper ref={ref}>
                <AddColumnHeader color={newColumnColor}>
                    <TaskCount color={newColumnColor}>{taskCount}</TaskCount>
                    <AddColumnTitle
                        type="text"
                        placeholder="Column title..."
                        value={newColumnTitle}
                        onChange={handleColumnTitleChange}
                        ref={titleInputRef}
                        onClick={handleTitleClick}
                        maxLength={25}
                    />
                    <CharCounter isLimitReached={newColumnTitle.length >= 25}>
                        {newColumnTitle.length}/25
                    </CharCounter>
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
            </EditColumnWrapper>
        );
    }
);

export default EditColumnForm;
