import { Tag, TaskDescription, TaskHeader, TaskWrapper } from './styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

interface TaskProps {
    id: string;
    title: string;
    description: string;
    priority?: { label: string; color: string };
}

const TaskCard: FC<TaskProps> = ({ id, title, description, priority }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TaskWrapper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            {priority && <Tag color={priority.color}>{priority.label}</Tag>}
            <TaskHeader>{title}</TaskHeader>
            <TaskDescription>{description}</TaskDescription>
        </TaskWrapper>
    );
};

export default TaskCard;
