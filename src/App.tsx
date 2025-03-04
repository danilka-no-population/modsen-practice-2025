import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { useState } from 'react';

import Board from './components/Board';
import Column from './components/Column';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import { useDnD } from './hooks/useDnD';
import { useDnDSensors } from './hooks/useDnDSensors';
import GlobalStyles from './styles/globalStyles';

function App() {
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
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
