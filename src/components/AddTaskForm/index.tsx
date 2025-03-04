/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';

import {
    PRIORITIES,
    PRIORITY_COLORS,
    PriorityLevel,
} from '../../constants/initialPriorities';
import { CancelButton, SaveButton } from '../Column/styled';
import { PriorityOption, PrioritySelect } from '../TaskCard/styled';
import {
    AddTaskWrapper,
    ButtonsContainer,
    TaskDescriptionInput,
    TaskPriority,
    TaskTitleInput,
} from './styled';

interface AddTaskFormProps {
    titleInput: string;
    descriptionInput: string;
    priority: PriorityLevel | null;
    handleAddTask: () => void;
    handleCancelTask: () => void;
    handlePriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionInputChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const AddTaskForm = forwardRef<HTMLDivElement, AddTaskFormProps>(
    (
        {
            titleInput,
            descriptionInput,
            priority,
            handleAddTask,
            handleCancelTask,
            handlePriorityChange,
            handleTitleInputChange,
            handleDescriptionInputChange,
        },
        ref
    ) => {
        return (
            <AddTaskWrapper ref={ref}>
                <TaskPriority
                    color={priority ? PRIORITY_COLORS[priority] : '#989ca6'}
                >
                    <PrioritySelect
                        value={priority ?? ''}
                        onChange={handlePriorityChange}
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
                    placeholder="Task title..."
                    value={titleInput}
                    onChange={handleTitleInputChange}
                />
                <TaskDescriptionInput
                    type="text"
                    placeholder="Task description..."
                    value={descriptionInput}
                    onChange={handleDescriptionInputChange}
                />

                <ButtonsContainer>
                    <SaveButton onClick={handleAddTask}>Save</SaveButton>
                    <CancelButton onClick={handleCancelTask}>
                        Cancel
                    </CancelButton>
                </ButtonsContainer>
            </AddTaskWrapper>
        );
    }
);

export default AddTaskForm;
