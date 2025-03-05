import { useState } from 'react';

import Board from '../../components/Board';
import Header from '../../components/Header';

const BoardPage = () => {
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);

    return (
        <>
            <Header setIsAddingColumn={setIsAddingColumn} />
            <Board
                isAddingColumn={isAddingColumn}
                setIsAddingColumn={setIsAddingColumn}
            />
        </>
    );
};

export default BoardPage;
