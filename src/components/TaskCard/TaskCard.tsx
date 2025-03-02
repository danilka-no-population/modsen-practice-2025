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
    Tag,
    TaskActions,
    TaskContainer,
    TaskDescription,
    TaskHeader,
    TaskWrapper,
} from './styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useEffect, useRef, useState } from 'react';

interface TaskProps {
    id: string;
    columnId: string;
    title: string;
    description: string;
    priority?: { label: string; color: string };
}

const priorityColors: Record<'Low' | 'Medium' | 'High', string> = {
    Low: '#22C55E',
    Medium: '#F59E0B',
    High: '#EF4444',
} as const;

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
                //@ts-ignore
                priority: priorityInput
                    ? {
                          label: priorityInput,
                          color: priorityColors[
                              priorityInput as 'Low' | 'Medium' | 'High'
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

    return (
        <TaskContainer>
            <>
                {isEditing ? (
                    <TaskWrapper>
                        <TaskPriority
                            color={
                                priorityInput
                                    ? priorityColors[
                                          priorityInput as
                                              | 'Low'
                                              | 'Medium'
                                              | 'High'
                                      ]
                                    : '#989ca6'
                            }
                        >
                            <select
                                value={priorityInput}
                                onChange={(e) =>
                                    setPriorityInput(e.target.value)
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
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            placeholder="Task title..."
                            ref={titleInputRef}
                            onClick={handleTitleClick}
                        />
                        <TaskDescriptionInput
                            type="text"
                            value={descriptionInput}
                            onChange={(e) =>
                                setDescriptionInput(e.target.value)
                            }
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
                    <EditButton onClick={() => setIsEditing(true)}>
                        ✏️
                    </EditButton>
                    <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
                </TaskActions>
            )}
        </TaskContainer>
    );
};

export default TaskCard;
