import whitePlus from '../../assets/icons/whitePlus.png';
import { Icon } from '../Header/styled';
import TaskCard from '../TaskCard/TaskCard';
import {
    AddTask,
    AddTaskButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    TaskCount,
    TasksWrapper,
} from './styled';
import { FC, useState } from 'react';

interface ColumnProps {
    title: string;
    taskCount: number;
    color: string;
}

interface Task {
    title: string;
    description: string;
    tag?: string;
    tagColor?: string;
}

const medium = { name: 'Medium', color: '#4F46E5' };
const low = { name: 'Low', color: '#22C55E' };
const high = { name: 'High', color: '#F43F5E' };

const Column: FC<ColumnProps> = ({ title, taskCount, color }) => {
    const [tasks] = useState<Task[]>([
        {
            title: 'Ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            description:
                '1. Lorem ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            tag: high.name,
            tagColor: high.color,
        },
        {
            title: 'Ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            description:
                '2. Lorem ipsum dolor sit amet, libre unst consectetur adipiscing elit. Ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            tag: medium.name,
            tagColor: medium.color,
        },
        {
            title: 'Ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            description:
                '3. Lorem ipsum dolor sit amet, libre unst consectetur adipiscing elit.',
            tag: low.name,
            tagColor: low.color,
        },
    ]);

    return (
        <ColumnWrapper>
            <ColumnHeader color={color}>
                <div>
                    <TaskCount color={color}>{taskCount}</TaskCount>
                    <ColumnTitle>{title}</ColumnTitle>
                </div>
                <AddTaskButton>
                    <Icon src={whitePlus} alt="Add task" />
                </AddTaskButton>
            </ColumnHeader>
            <TasksWrapper>
                {tasks.map((task) => (
                    <TaskCard
                        title={task.title}
                        description={task.description}
                        tag={task?.tag}
                        tagColor={task?.tagColor}
                        key={Date.now()}
                    />
                ))}
            </TasksWrapper>
            <AddTask color={color}>
                <div>Add task...</div>
            </AddTask>
        </ColumnWrapper>
    );
};

export default Column;
