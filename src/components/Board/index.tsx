import React, { useEffect, useRef, useState } from 'react';
import { HuePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { addColumn } from '../../store/slices/columnSlice';
import Column from '../Column/Column';
import {
    BoardWrapper,
    CancelButton,
    SaveButton,
    TaskCount,
} from '../Column/styled';
import {
    AddButtonsContainer,
    AddColumnHeader,
    AddColumnTitle,
    AddColumnWrapper,
    ColorWrapper,
    NoColumnsText,
    Wrapper,
} from './styled';

interface BoardProps {
    isAddingColumn: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsAddingColumn: (value: boolean) => void;
}

const Board = ({ isAddingColumn, setIsAddingColumn }: BoardProps) => {
    const dispatch = useAppDispatch();
    const columns = useAppSelector((state) => state.columns.columns);

    const [newColumnTitle, setNewColumnTitle] = useState<string>('');
    const [newColumnColor, setNewColumnColor] = useState<string>('#8A8A8A');

    const handleAddColumn = () => {
        if (newColumnTitle.trim() !== '') {
            dispatch(
                addColumn({
                    id: uuidv4(),
                    title: newColumnTitle,
                    color: newColumnColor,
                })
            );
            setIsAddingColumn(false);
            setNewColumnTitle('');
            setNewColumnColor('#8A8A8A');
        }
    };

    const handleCancel = () => {
        setIsAddingColumn(false);
        setNewColumnTitle('');
        setNewColumnColor('#8A8A8A');
    };

    const handleColumnTitleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewColumnTitle(e.target.value);
    };

    const handleColorChange = (color: { hex: string }) => {
        setNewColumnColor(color.hex);
    };

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
    }, [isAddingColumn, setIsAddingColumn]);

    return (
        <BoardWrapper>
            {columns.map((column) => (
                <Wrapper>
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        color={column.color}
                    />
                </Wrapper>
            ))}
            {isAddingColumn && (
                <AddColumnWrapper ref={addColumnFormRef}>
                    <AddColumnHeader color={newColumnColor}>
                        <TaskCount color={newColumnColor}>0</TaskCount>
                        <AddColumnTitle
                            type="text"
                            placeholder="Column title..."
                            value={newColumnTitle}
                            onChange={handleColumnTitleChange}
                        />
                    </AddColumnHeader>
                    <ColorWrapper>
                        <HuePicker
                            color={newColumnColor}
                            onChangeComplete={handleColorChange}
                            width="100%"
                        />
                    </ColorWrapper>
                    <AddButtonsContainer>
                        <SaveButton
                            onClick={handleAddColumn}
                            disabled={newColumnTitle.trim() === ''}
                        >
                            Save
                        </SaveButton>
                        <CancelButton onClick={handleCancel}>
                            Cancel
                        </CancelButton>
                    </AddButtonsContainer>
                </AddColumnWrapper>
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
