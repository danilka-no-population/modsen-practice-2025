import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import whitePlus from '../../assets/icons/whitePlus.png';
import {
    PRIORITIES,
    PRIORITY_COLORS,
    PriorityLevel,
} from '../../constants/initialPriorities';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { removeColumn } from '../../store/slices/columnSlice';
import { addTask, removeTasksByColumnId } from '../../store/slices/taskSlice';
import { Icon } from '../Header/styled';
import TaskCard from '../TaskCard';
import { PriorityOption, PrioritySelect } from '../TaskCard/styled';
import {
    AddTask,
    AddTaskButton,
    AddTaskForm,
    ButtonsContainer,
    CancelButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    Container,
    DeleteColumnButton,
    DraggableContainer,
    NoTasksText,
    SaveButton,
    TaskCount,
    TaskDescriptionInput,
    TaskPriority,
    TasksWrapper,
    TaskTitleInput,
} from './styled';

interface ColumnProps {
    id: string;
    title: string;
    color: string;
}

const Column: FC<ColumnProps> = ({ id, title, color }) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) =>
        state.tasks.tasks.filter((task) => task.columnId === id)
    );

    const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
    const [titleInput, setTitleInput] = useState<string>('');
    const [descriptionInput, setDescriptionInput] = useState<string>('');
    const [priority, setPriority] = useState<PriorityLevel | null>(null);

    const { setNodeRef } = useDroppable({ id });

    const {
        attributes,
        listeners,
        setNodeRef: setColumnNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const addTaskFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAddingTask && addTaskFormRef.current) {
            addTaskFormRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [isAddingTask]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isAddingTask &&
                addTaskFormRef.current &&
                !addTaskFormRef.current.contains(event.target as Node)
            ) {
                setIsAddingTask(false);
                setTitleInput('');
                setDescriptionInput('');
                setPriority(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAddingTask]);

    const handleAddTask = () => {
        if (titleInput.trim() === '') return;

        dispatch(
            addTask({
                id: uuidv4(),
                columnId: id,
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

    const handleRemoveColumn = () => {
        if (confirm('Are you sure you want to delete the column?')) {
            dispatch(removeColumn(id));
            dispatch(removeTasksByColumnId(id));
        }
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

    return (
        <ColumnWrapper ref={setColumnNodeRef} style={style}>
            <ColumnHeader color={color}>
                <DraggableContainer {...attributes} {...listeners}>
                    <TaskCount color={color}>{tasks.length}</TaskCount>
                    <ColumnTitle>{title}</ColumnTitle>
                </DraggableContainer>
                <Container>
                    <DeleteColumnButton
                        color={color}
                        onClick={handleRemoveColumn}
                    >
                        Delete
                    </DeleteColumnButton>
                    <AddTaskButton onClick={handleAddTaskClick}>
                        <Icon src={whitePlus} alt="Add task" />
                    </AddTaskButton>
                </Container>
            </ColumnHeader>
            <SortableContext
                items={tasks
                    .filter((task) => task !== null)
                    .map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <TasksWrapper ref={setNodeRef}>
                    {tasks
                        .filter((task) => task !== null)
                        .map((task) => (
                            <TaskCard key={task.id} {...task} columnId={id} />
                        ))}
                    {tasks.length === 0 && !isAddingTask && (
                        <NoTasksText>
                            There are no tasks in the column, add the first
                            one😇
                        </NoTasksText>
                    )}

                    {isAddingTask && (
                        <AddTaskForm ref={addTaskFormRef}>
                            <TaskPriority
                                color={
                                    priority
                                        ? PRIORITY_COLORS[priority]
                                        : '#989ca6'
                                }
                            >
                                <PrioritySelect
                                    value={priority ?? ''}
                                    onChange={handlePriorityChange}
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
                                <SaveButton onClick={handleAddTask}>
                                    Save
                                </SaveButton>
                                <CancelButton onClick={handleCancelTask}>
                                    Cancel
                                </CancelButton>
                            </ButtonsContainer>
                        </AddTaskForm>
                    )}
                </TasksWrapper>
            </SortableContext>
            <AddTask color={color} onClick={handleAddTaskClick}>
                <Container>Add task...</Container>
            </AddTask>
        </ColumnWrapper>
    );
};

export default Column;
