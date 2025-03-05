import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useEffect, useRef, useState } from 'react';

import whitePlus from '#assets/icons/whitePlus.png';
import AddTaskForm from '#components/AddTaskForm';
import EditColumnForm from '#components/EditColumnForm';
import { Icon } from '#components/Header/styled';
import TaskCard from '#components/TaskCard';
import { useAppDispatch, useAppSelector } from '#hooks/typedReduxHooks';
import { useAddTask } from '#hooks/useAddTask';
import { removeColumn, updateColumn } from '#store/slices/columnSlice';
import { removeTasksByColumnId } from '#store/slices/taskSlice';

import {
    AddTask,
    AddTaskButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    Container,
    DeleteButton,
    DraggableContainer,
    EditButton,
    NoTasksText,
    TaskCount,
    TasksWrapper,
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

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(title);
    const [editedColor, setEditedColor] = useState<string>(color);

    const {
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
    } = useAddTask(id);

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
                handleCancelTask();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAddingTask, handleCancelTask]);

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(title);
        setEditedColor(color);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isEditing &&
                addTaskFormRef.current &&
                !addTaskFormRef.current.contains(event.target as Node)
            ) {
                handleCancelEdit();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    const handleRemoveColumn = () => {
        if (confirm('Are you sure you want to delete the column?')) {
            dispatch(removeColumn(id));
            dispatch(removeTasksByColumnId(id));
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim() !== '') {
            dispatch(
                updateColumn({ id, title: editedTitle, color: editedColor })
            );
            setIsEditing(false);
        }
    };

    return (
        <ColumnWrapper ref={setColumnNodeRef} style={style}>
            {isEditing ? (
                <EditColumnForm
                    taskCount={tasks.length}
                    ref={addTaskFormRef}
                    newColumnTitle={editedTitle}
                    newColumnColor={editedColor}
                    handleAddColumn={handleSaveEdit}
                    handleCancel={handleCancelEdit}
                    handleColumnTitleChange={(e) =>
                        setEditedTitle(e.target.value)
                    }
                    handleColorChange={(color) => setEditedColor(color.hex)}
                />
            ) : (
                <ColumnHeader color={color}>
                    <DraggableContainer {...attributes} {...listeners}>
                        <TaskCount color={color}>{tasks.length}</TaskCount>
                        <ColumnTitle>{title}</ColumnTitle>
                    </DraggableContainer>
                    <Container>
                        <EditButton onClick={handleEditClick}>✏️</EditButton>
                        <DeleteButton
                            color={color}
                            onClick={handleRemoveColumn}
                        >
                            🗑️
                        </DeleteButton>
                        <AddTaskButton onClick={handleAddTaskClick}>
                            <Icon src={whitePlus} alt="Add task" />
                        </AddTaskButton>
                    </Container>
                </ColumnHeader>
            )}
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
                        <AddTaskForm
                            ref={addTaskFormRef}
                            titleInput={titleInput}
                            descriptionInput={descriptionInput}
                            priority={priority}
                            handleAddTask={handleAddTask}
                            handleCancelTask={handleCancelTask}
                            handlePriorityChange={handlePriorityChange}
                            handleTitleInputChange={handleTitleInputChange}
                            handleDescriptionInputChange={
                                handleDescriptionInputChange
                            }
                        />
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
