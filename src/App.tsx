import Column from './components/Column/Column';
import { BoardWrapper } from './components/Column/styled';
import Header from './components/Header/Header';
import TaskCard from './components/TaskCard/TaskCard';
import { useAppDispatch, useAppSelector } from './hooks/typedReduxHooks';
import { moveTask, reorderTasks, Task } from './store/slices/taskSlice';
import GlobalStyles from './styles/globalStyles';
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

function App() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const columns = useAppSelector((state) => state.columns.columns);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const taskId = event.active.id.toString();
        const task = tasks.find((task) => task.id === taskId) || null;
        setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id.toString();
        const overId = over.id.toString();

        const movingTask = tasks.find((task) => task.id === taskId);
        if (!movingTask) return;

        const sourceColumnId = movingTask.columnId;

        let targetColumnId = columns.find((col) => col.id === overId)?.id;
        if (!targetColumnId) {
            targetColumnId = tasks.find((task) => task.id === overId)?.columnId;
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
                dispatch(reorderTasks({ columnId: sourceColumnId, newOrder }));
            }
        }

        setActiveTask(null);
    };

    return (
        <>
            <GlobalStyles />
            <Header />
            <DndContext
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={() => setActiveTask(null)}
            >
                <BoardWrapper>
                    <Column id="todo" title={'To Do'} color="#4F46E5" />
                    <Column
                        id="in-progress"
                        title={'In progress'}
                        color="#F59E0B"
                    />
                    <Column id="done" title={'Done'} color="#22C55E" />
                </BoardWrapper>
                <DragOverlay>
                    {activeTask ? (
                        <TaskCard
                            id={activeTask.id}
                            title={activeTask.title}
                            description={activeTask.description}
                            priority={activeTask.priority}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}

export default App;
