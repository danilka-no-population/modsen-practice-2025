import whitePlus from '../../assets/icons/whitePlus.png';
import { Icon } from '../Header/styled';
import {
    AddTask,
    AddTaskButton,
    ColumnHeader,
    ColumnTitle,
    ColumnWrapper,
    TaskCount,
    TasksWrapper,
} from './styled';
import { FC } from 'react';

interface ColumnProps {
    title: string;
    taskCount: number;
    color: string;
}

const Column: FC<ColumnProps> = ({ title, taskCount, color }) => {
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
            <TasksWrapper></TasksWrapper>
            <AddTask color={color}>
                <div>Add task...</div>
            </AddTask>
        </ColumnWrapper>
    );
};

export default Column;
