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
} from './styled';
import { useState } from 'react';
import { HuePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';

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

    return (
        <BoardWrapper>
            {columns.map((column) => (
                <Column
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    color={column.color}
                />
            ))}
            {isAddingColumn && (
                <AddColumnWrapper>
                    <AddColumnHeader color={newColumnColor}>
                        <TaskCount color={newColumnColor}>0</TaskCount>
                        <AddColumnTitle
                            type="text"
                            placeholder="Column title..."
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                        />
                    </AddColumnHeader>
                    <ColorWrapper>
                        <HuePicker
                            color={newColumnColor}
                            onChangeComplete={(color) =>
                                setNewColumnColor(color.hex)
                            }
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
        </BoardWrapper>
    );
};

export default Board;
