import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '#hooks/typedReduxHooks';
import { reorderColumns } from '#store/slices/columnSlice';
import { moveTask, reorderTasks } from '#store/slices/taskSlice';
import { Column as ColumnType } from '#types/columnTypes';
import { Task } from '#types/taskTypes';

export const useDnD = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const columns = useAppSelector((state) => state.columns.columns);

    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

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

    const handleDragCancel = () => {
        setActiveTask(null);
        setActiveColumn(null);
    };

    return {
        activeTask,
        activeColumn,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
    };
};
