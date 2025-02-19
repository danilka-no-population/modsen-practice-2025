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
                <Column title={'To Do'} color="#4F46E5" taskCount={2} />
                <Column title={'In progress'} color="#F59E0B" taskCount={3} />
                <Column title={'Done'} color="#22C55E" taskCount={2} />
            </BoardWrapper>
        </>
    );
}

export default App;
