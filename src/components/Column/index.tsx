import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useEffect, useRef } from 'react';

import whitePlus from '../../assets/icons/whitePlus.png';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { useAddTask } from '../../hooks/useAddTask';
import { removeColumn } from '../../store/slices/columnSlice';
import { removeTasksByColumnId } from '../../store/slices/taskSlice';
import AddTaskForm from '../AddTaskForm';
import { Icon } from '../Header/styled';
import TaskCard from '../TaskCard';
import {
    AddTask,
    AddTaskButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    Container,
    DeleteColumnButton,
    DraggableContainer,
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

    const handleRemoveColumn = () => {
        if (confirm('Are you sure you want to delete the column?')) {
            dispatch(removeColumn(id));
            dispatch(removeTasksByColumnId(id));
        }
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
