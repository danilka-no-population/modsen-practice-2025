import { Tag, TaskDescription, TaskHeader, TaskWrapper } from './styled';
import { FC } from 'react';

interface TaskProps {
    title: string;
    description: string;
    tag?: string;
    tagColor?: string;
}

const TaskCard: FC<TaskProps> = ({
    title,
    description,
    tag = 'Low',
    tagColor = '#22C55E',
}) => {
    return (
        <TaskWrapper>
            {tag && <Tag color={tagColor}>{tag}</Tag>}
            <TaskHeader>{title}</TaskHeader>
            <TaskDescription>{description}</TaskDescription>
        </TaskWrapper>
    );
};

export default TaskCard;
