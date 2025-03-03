import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { FC, useEffect, useRef, useState } from 'react';

import {
    PRIORITIES,
    PRIORITY_COLORS,
    PriorityLevel,
} from '../../constants/initialPriorities';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { editTask, removeTask } from '../../store/slices/taskSlice';
import {
    ButtonsContainer,
    CancelButton,
    SaveButton,
    TaskDescriptionInput,
    TaskPriority,
    TaskTitleInput,
} from '../Column/styled';
import {
    DeleteButton,
    EditButton,
    PriorityOption,
    PrioritySelect,
    Tag,
    TaskActions,
    TaskContainer,
    TaskDescription,
    TaskHeader,
    TaskWrapper,
} from './styled';

interface TaskProps {
    id: string;
    columnId: string;
    title: string;
    description: string;
    priority?: { label: string; color: string };
}

const TaskCard: FC<TaskProps> = ({
    id,
    title,
    description,
    priority,
    columnId,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [titleInput, setTitleInput] = useState<string>(title);
    const [descriptionInput, setDescriptionInput] =
        useState<string>(description);
    const [priorityInput, setPriorityInput] = useState(priority?.label || '');

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const isFirstClickTitle = useRef(true);
    const isFirstClickDescription = useRef(true);

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

    const handleDescriptionClick = () => {
        if (descriptionInputRef.current) {
            if (isFirstClickDescription.current) {
                const length = descriptionInputRef.current.value.length;
                descriptionInputRef.current.setSelectionRange(length, length);
                descriptionInputRef.current.scrollLeft =
                    descriptionInputRef.current.scrollWidth;
                isFirstClickDescription.current = false;
            }
        }
    };

    useEffect(() => {
        if (!isEditing) {
            isFirstClickTitle.current = true;
            isFirstClickDescription.current = true;
        }
    }, [isEditing]);

    const dispatch = useAppDispatch();

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

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
            dispatch(removeTask(id));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTitleInput(title);
        setDescriptionInput(description);
        setPriorityInput(priority?.label || '');
    };

    const handlePriorityInputChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPriorityInput(e.target.value);
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

    return (
        <TaskContainer>
            <>
                {isEditing ? (
                    <TaskWrapper>
                        <TaskPriority
                            color={
                                priorityInput
                                    ? PRIORITY_COLORS[
                                          priorityInput as PriorityLevel
                                      ]
                                    : '#989ca6'
                            }
                        >
                            <PrioritySelect
                                value={priorityInput}
                                onChange={handlePriorityInputChange}
                            >
                                {PRIORITIES.map((priority) => (
                                    <PriorityOption value={priority.value}>
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
                        />
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
                                Сохранить
                            </SaveButton>
                            <CancelButton onClick={handleCancel}>
                                Отмена
                            </CancelButton>
                        </ButtonsContainer>
                    </TaskWrapper>
                ) : (
                    <TaskWrapper
                        ref={setNodeRef}
                        {...attributes}
                        {...listeners}
                        style={style}
                    >
                        {priority && (
                            <Tag color={priority.color}>{priority.label}</Tag>
                        )}
                        <TaskHeader>{title}</TaskHeader>
                        <TaskDescription>{description}</TaskDescription>
                    </TaskWrapper>
                )}
            </>
            {!isEditing && (
                <TaskActions>
                    <EditButton onClick={handleEditing}>✏️</EditButton>
                    <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
                </TaskActions>
            )}
        </TaskContainer>
    );
};

export default TaskCard;
