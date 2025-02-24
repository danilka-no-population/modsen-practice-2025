import Column from './components/Column/Column';
import { BoardWrapper } from './components/Column/styled';
import Header from './components/Header/Header';
import GlobalStyles from './styles/globalStyles';

function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <BoardWrapper>
                <Column id="todo" title={'To Do'} color="#4F46E5" />
                <Column
                    id="in-progress"
                    title={'In progress'}
                    color="#F59E0B"
                />
                <Column id="done" title={'Done'} color="#22C55E" />
            </BoardWrapper>
        </>
    );
}

export default App;
