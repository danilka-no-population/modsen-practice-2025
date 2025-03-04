import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PRIORITY_COLORS, PriorityLevel } from '../constants/initialPriorities';
import { useAppDispatch } from '../hooks/typedReduxHooks';
import { addTask } from '../store/slices/taskSlice';

export const useAddTask = (columnId: string) => {
    const dispatch = useAppDispatch();

    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
    const [titleInput, setTitleInput] = useState<string>('');
    const [descriptionInput, setDescriptionInput] = useState<string>('');
    const [priority, setPriority] = useState<PriorityLevel | null>(null);

    const handleAddTask = () => {
        if (titleInput.trim() === '') return;

        dispatch(
            addTask({
                id: uuidv4(),
                columnId,
                title: titleInput,
                description: descriptionInput,
                priority: priority
                    ? { label: priority, color: PRIORITY_COLORS[priority] }
                    : undefined,
            })
        );

        setIsAddingTask(false);
        setTitleInput('');
        setDescriptionInput('');
        setPriority(null);
    };

    const handleCancelTask = () => {
        setIsAddingTask(false);
        setTitleInput('');
        setDescriptionInput('');
        setPriority(null);
    };

    const handleAddTaskClick = () => {
        setIsAddingTask(true);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(
            e.target.value
                ? (e.target.value as keyof typeof PRIORITY_COLORS)
                : null
        );
    };

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value);
    };

    const handleDescriptionInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescriptionInput(e.target.value);
    };

    return {
        isAddingTask,
        titleInput,
        descriptionInput,
        priority,
        handleAddTask,
        handleCancelTask,
        handleAddTaskClick,
        handlePriorityChange,
        handleTitleInputChange,
        handleDescriptionInputChange,
    };
};
