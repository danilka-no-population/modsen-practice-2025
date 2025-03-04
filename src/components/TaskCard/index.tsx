import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC, useEffect, useRef } from 'react';

import { PriorityLevel } from '../../constants/initialPriorities';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { useTaskEditing } from '../../hooks/useTaskEditing';
import { removeTask } from '../../store/slices/taskSlice';
import TaskEditForm from '../TaskEditForm';
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

    const {
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
    } = useTaskEditing(
        id,
        columnId,
        title,
        description,
        priority?.label as PriorityLevel
    );

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

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
            dispatch(removeTask(id));
        }
    };

    return (
        <TaskContainer>
            <>
                {isEditing ? (
                    <TaskWrapper>
                        <TaskEditForm
                            titleInput={titleInput}
                            descriptionInput={descriptionInput}
                            priorityInput={priorityInput}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            handlePriorityInputChange={
                                handlePriorityInputChange
                            }
                            handleTitleInputChange={handleTitleInputChange}
                            handleDescriptionInputChange={
                                handleDescriptionInputChange
                            }
                            titleInputRef={titleInputRef}
                            descriptionInputRef={descriptionInputRef}
                            handleTitleClick={handleTitleClick}
                            handleDescriptionClick={handleDescriptionClick}
                        />
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
