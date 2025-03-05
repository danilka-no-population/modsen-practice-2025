import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { Route, Routes } from 'react-router-dom';

import Column from '#components/Column';
import TaskCard from '#components/TaskCard';
import { useDnD } from '#hooks/useDnD';
import { useDnDSensors } from '#hooks/useDnDSensors';
import BoardPage from '#pages/BoardPage';
import NotFoundPage from '#pages/NotFoundPage';
import GlobalStyles from '#styles/globalStyles';

function App() {
    const sensors = useDnDSensors();
    const {
        activeTask,
        activeColumn,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
    } = useDnD();

    return (
        <>
            <GlobalStyles />
            <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Routes>
                    <Route path="/" element={<BoardPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
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
