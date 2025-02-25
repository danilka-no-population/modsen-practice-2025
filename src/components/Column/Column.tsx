import whitePlus from '../../assets/icons/whitePlus.png';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { addTask } from '../../store/slices/taskSlice';
import { Icon } from '../Header/styled';
import TaskCard from '../TaskCard/TaskCard';
import {
    AddTask,
    AddTaskButton,
    AddTaskForm,
    ButtonsContainer,
    CancelButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    SaveButton,
    TaskCount,
    TaskDescriptionInput,
    TaskPriority,
    TasksWrapper,
    TaskTitleInput,
} from './styled';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    const [priority, setPriority] = useState<
        keyof typeof priorityColors | null
    >(null);

    const priorityColors: Record<'Low' | 'Medium' | 'High', string> = {
        Low: '#22C55E',
        Medium: '#F59E0B',
        High: '#EF4444',
    } as const;

    const { setNodeRef } = useDroppable({ id });

    const handleAddTask = () => {
        if (titleInput.trim() === '') return;

        dispatch(
            addTask({
                id: uuidv4(),
                columnId: id,
                title: titleInput,
                description: descriptionInput,
                priority: priority
                    ? { label: priority, color: priorityColors[priority] }
                    : undefined,
            })
        );

        setIsAddingTask(false);
        setTitleInput('');
        setDescriptionInput('');
        setPriority(null);
    };

    return (
        <ColumnWrapper ref={setNodeRef}>
            <ColumnHeader color={color}>
                <div>
                    <TaskCount color={color}>{tasks.length}</TaskCount>
                    <ColumnTitle>{title}</ColumnTitle>
                </div>
                <AddTaskButton onClick={() => setIsAddingTask(true)}>
                    <Icon src={whitePlus} alt="Add task" />
                </AddTaskButton>
            </ColumnHeader>
            <SortableContext
                items={tasks
                    .filter((task) => task !== null)
                    .map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <TasksWrapper>
                    {tasks
                        .filter((task) => task !== null)
                        .map((task) => (
                            <TaskCard key={task.id} {...task} />
                        ))}

                    {isAddingTask && (
                        <AddTaskForm>
                            <TaskPriority
                                color={
                                    priority
                                        ? priorityColors[
                                              priority as
                                                  | 'Low'
                                                  | 'Medium'
                                                  | 'High'
                                          ]
                                        : '#989ca6'
                                }
                            >
                                <select
                                    value={priority ?? ''}
                                    onChange={(e) =>
                                        setPriority(
                                            e.target.value
                                                ? (e.target
                                                      .value as keyof typeof priorityColors)
                                                : null
                                        )
                                    }
                                >
                                    <option value="">None</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </TaskPriority>

                            <TaskTitleInput
                                type="text"
                                placeholder="Task title..."
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                            <TaskDescriptionInput
                                type="text"
                                placeholder="Task description..."
                                value={descriptionInput}
                                onChange={(e) =>
                                    setDescriptionInput(e.target.value)
                                }
                            />

                            <ButtonsContainer>
                                <SaveButton onClick={handleAddTask}>
                                    Save
                                </SaveButton>
                                <CancelButton
                                    onClick={() => setIsAddingTask(false)}
                                >
                                    Cancel
                                </CancelButton>
                            </ButtonsContainer>
                        </AddTaskForm>
                    )}
                </TasksWrapper>
            </SortableContext>
            <AddTask color={color} onClick={() => setIsAddingTask(true)}>
                <div>Add task...</div>
            </AddTask>
        </ColumnWrapper>
    );
};

export default Column;
