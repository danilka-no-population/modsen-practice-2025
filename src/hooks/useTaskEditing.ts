import React, { useState } from 'react';

import { PRIORITY_COLORS, PriorityLevel } from '../constants/initialPriorities';
import { useAppDispatch } from '../hooks/typedReduxHooks';
import { editTask } from '../store/slices/taskSlice';

export const useTaskEditing = (
    id: string,
    columnId: string,
    initialTitle: string,
    initialDescription: string,
    initialPriority?: PriorityLevel
) => {
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [titleInput, setTitleInput] = useState<string>(initialTitle);
    const [descriptionInput, setDescriptionInput] =
        useState<string>(initialDescription);
    const [priorityInput, setPriorityInput] = useState<PriorityLevel | ''>(
        initialPriority || ''
    );

    const handleSave = () => {
        if (titleInput.trim() === '') return;

        dispatch(
            editTask({
                id,
                columnId,
                title: titleInput,
                description: descriptionInput,
                priority: priorityInput
                    ? {
                          label: priorityInput as PriorityLevel,
                          color: PRIORITY_COLORS[
                              priorityInput as PriorityLevel
                          ],
                      }
                    : undefined,
            })
        );
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTitleInput(initialTitle);
        setDescriptionInput(initialDescription);
        setPriorityInput(initialPriority || '');
    };

    const handlePriorityInputChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPriorityInput(e.target.value as PriorityLevel | '');
    };

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value);
    };

    const handleDescriptionInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescriptionInput(e.target.value);
    };

    const handleEditing = () => {
        setIsEditing(true);
    };

    return {
        isEditing,
        titleInput,
        descriptionInput,
        priorityInput,
        handleSave,
        handleCancel,
        handlePriorityInputChange,
        handleTitleInputChange,
        handleDescriptionInputChange,
        handleEditing,
    };
};
