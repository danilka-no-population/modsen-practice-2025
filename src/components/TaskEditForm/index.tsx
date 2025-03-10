/* eslint-disable no-unused-vars */
import React from 'react';

import {
    ButtonsContainer,
    CharCounter,
    TaskDescriptionInput,
    TaskPriority,
    TaskTitleInput,
} from '#components/AddTaskForm/styled';
import { CancelButton, SaveButton } from '#components/Column/styled';
import { PriorityOption, PrioritySelect } from '#components/TaskCard/styled';
import {
    PRIORITIES,
    PRIORITY_COLORS,
    PriorityLevel,
} from '#constants/initialPriorities';

interface TaskEditFormProps {
    titleInput: string;
    descriptionInput: string;
    priorityInput: PriorityLevel | '';
    handleSave: () => void;
    handleCancel: () => void;
    handlePriorityInputChange: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    handleTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionInputChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    titleInputRef: React.RefObject<HTMLInputElement | null>;
    descriptionInputRef: React.RefObject<HTMLInputElement | null>;
    handleTitleClick: () => void;
    handleDescriptionClick: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
    titleInput,
    descriptionInput,
    priorityInput,
    handleSave,
    handleCancel,
    handlePriorityInputChange,
    handleTitleInputChange,
    handleDescriptionInputChange,
    titleInputRef,
    descriptionInputRef,
    handleTitleClick,
    handleDescriptionClick,
}) => {
    return (
        <>
            <TaskPriority
                color={
                    priorityInput
                        ? PRIORITY_COLORS[priorityInput as PriorityLevel]
                        : '#989ca6'
                }
            >
                <PrioritySelect
                    value={priorityInput}
                    onChange={handlePriorityInputChange}
                >
                    {PRIORITIES.map((priority) => (
                        <PriorityOption
                            value={priority.value}
                            key={priority.value}
                        >
                            {priority.text}
                        </PriorityOption>
                    ))}
                </PrioritySelect>
            </TaskPriority>
            <TaskTitleInput
                type="text"
                value={titleInput}
                onChange={handleTitleInputChange}
                placeholder="Task title..."
                ref={titleInputRef}
                onClick={handleTitleClick}
                maxLength={60}
            />
            <CharCounter isLimitReached={titleInput.length >= 60}>
                {titleInput.length}/60
            </CharCounter>
            <TaskDescriptionInput
                type="text"
                value={descriptionInput}
                onChange={handleDescriptionInputChange}
                placeholder="Task description..."
                ref={descriptionInputRef}
                onClick={handleDescriptionClick}
            />
            <ButtonsContainer>
                <SaveButton
                    onClick={handleSave}
                    disabled={titleInput.trim() === ''}
                >
                    Save
                </SaveButton>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ButtonsContainer>
        </>
    );
};

export default TaskEditForm;
