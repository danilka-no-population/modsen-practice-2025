import { useEffect, useRef } from 'react';

import AddColumnForm from '#components/AddColumnForm';
import Column from '#components/Column';
import { BoardWrapper } from '#components/Column/styled';
import { useAppSelector } from '#hooks/typedReduxHooks';
import { useAddColumn } from '#hooks/useAddColumn';

import { NoColumnsText, Wrapper } from './styled';

interface BoardProps {
    isAddingColumn: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsAddingColumn: (value: boolean) => void;
}

const Board = ({ isAddingColumn, setIsAddingColumn }: BoardProps) => {
    const columns = useAppSelector((state) => state.columns.columns);

    const {
        newColumnTitle,
        newColumnColor,
        setNewColumnTitle,
        setNewColumnColor,
        handleAddColumn,
        handleCancel,
        handleColumnTitleChange,
        handleColorChange,
    } = useAddColumn(setIsAddingColumn);

    const addColumnFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAddingColumn && addColumnFormRef.current) {
            addColumnFormRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [isAddingColumn]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isAddingColumn &&
                addColumnFormRef.current &&
                !addColumnFormRef.current.contains(event.target as Node)
            ) {
                setIsAddingColumn(false);
                setNewColumnTitle('');
                setNewColumnColor('#8A8A8A');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isAddingColumn,
        setIsAddingColumn,
        setNewColumnTitle,
        setNewColumnColor,
    ]);

    return (
        <BoardWrapper>
            {columns.map((column) => (
                <Wrapper key={column.id}>
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        color={column.color}
                    />
                </Wrapper>
            ))}
            {isAddingColumn && (
                <AddColumnForm
                    ref={addColumnFormRef}
                    newColumnTitle={newColumnTitle}
                    newColumnColor={newColumnColor}
                    handleAddColumn={handleAddColumn}
                    handleCancel={handleCancel}
                    handleColumnTitleChange={handleColumnTitleChange}
                    handleColorChange={handleColorChange}
                />
            )}
            {columns.length === 0 && isAddingColumn === false && (
                <NoColumnsText>
                    There are no columns at the moment, add the first one to
                    track your assignments😇
                </NoColumnsText>
            )}
        </BoardWrapper>
    );
};

export default Board;
