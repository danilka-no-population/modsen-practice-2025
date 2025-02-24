import { Tag, TaskDescription, TaskHeader, TaskWrapper } from './styled';
import { FC } from 'react';

interface TaskProps {
    title: string;
    description: string;
    priority?: { label: string; color: string };
}

const TaskCard: FC<TaskProps> = ({ title, description, priority }) => {
    return (
        <TaskWrapper>
            {priority && <Tag color={priority.color}>{priority.label}</Tag>}
            <TaskHeader>{title}</TaskHeader>
            <TaskDescription>{description}</TaskDescription>
        </TaskWrapper>
    );
};

export default TaskCard;
