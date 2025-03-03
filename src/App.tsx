import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    rectIntersection,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import Board from './components/Board';
import Column from './components/Column/Column';
import Header from './components/Header/Header';
import TaskCard from './components/TaskCard/TaskCard';
import { useAppDispatch, useAppSelector } from './hooks/typedReduxHooks';
import { reorderColumns } from './store/slices/columnSlice';
import { moveTask, reorderTasks } from './store/slices/taskSlice';
import GlobalStyles from './styles/globalStyles';
import { Column as ColumnType } from './types/columnTypes';
import { Task } from './types/taskTypes';

function App() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const columns = useAppSelector((state) => state.columns.columns);

    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const taskId = event.active.id.toString();
        const task = tasks.find((task) => task.id === taskId) || null;
        setActiveTask(task);

        const columnId = event.active.id.toString();
        const column = columns.find((col) => col.id === columnId) || null;
        setActiveColumn(column);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        if (columns.some((col) => col.id === activeId)) {
            const oldIndex = columns.findIndex((col) => col.id === activeId);
            const newIndex = columns.findIndex((col) => col.id === overId);

            if (
                columns.some((col) => col.id === overId) &&
                oldIndex !== newIndex
            ) {
                const newOrder = arrayMove(columns, oldIndex, newIndex);
                dispatch(reorderColumns(newOrder));
            }
        } else {
            const taskId = active.id.toString();
            const movingTask = tasks.find((task) => task.id === taskId);
            if (!movingTask) return;

            const sourceColumnId = movingTask.columnId;

            let targetColumnId = columns.find((col) => col.id === overId)?.id;
            if (!targetColumnId) {
                targetColumnId = tasks.find(
                    (task) => task.id === overId
                )?.columnId;
            }

            if (!targetColumnId) return;

            if (sourceColumnId !== targetColumnId) {
                dispatch(moveTask({ taskId, newColumnId: targetColumnId }));

                const targetTasks = tasks.filter(
                    (task) => task.columnId === targetColumnId
                );
                const updatedTaskOrder = [movingTask, ...targetTasks];

                dispatch(
                    reorderTasks({
                        columnId: targetColumnId,
                        newOrder: updatedTaskOrder.map((task) => task.id),
                    })
                );
            } else {
                const columnTasks = tasks.filter(
                    (task) => task.columnId === sourceColumnId
                );
                const oldIndex = columnTasks.findIndex(
                    (task) => task.id === taskId
                );
                const newIndex = columnTasks.findIndex(
                    (task) => task.id === overId
                );

                if (oldIndex !== newIndex) {
                    const newOrder = arrayMove(
                        columnTasks.map((task) => task.id),
                        oldIndex,
                        newIndex
                    );
                    dispatch(
                        reorderTasks({ columnId: sourceColumnId, newOrder })
                    );
                }
            }
        }

        setActiveTask(null);
        setActiveColumn(null);
    };

    useEffect(() => {
        if (activeTask || activeColumn) {
            document.body.classList.add('dragging');
        } else {
            document.body.classList.remove('dragging');
        }
    }, [activeTask, activeColumn]);

    const handleDragCancel = () => {
        setActiveTask(null);
        setActiveColumn(null);
    };

    return (
        <>
            <GlobalStyles />
            <Header setIsAddingColumn={setIsAddingColumn} />
            <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Board
                    isAddingColumn={isAddingColumn}
                    setIsAddingColumn={setIsAddingColumn}
                />
                <DragOverlay>
                    {activeTask ? (
                        <TaskCard
                            id={activeTask.id}
                            title={activeTask.title}
                            description={activeTask.description}
                            priority={activeTask.priority}
                            columnId={activeTask.columnId}
                        />
                    ) : null}
                    {activeColumn ? (
                        <Column
                            id={activeColumn.id}
                            title={activeColumn.title}
                            color={activeColumn.color}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}

export default App;
