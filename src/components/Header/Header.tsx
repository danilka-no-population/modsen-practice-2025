import burgerIcon from '../../assets/icons/burger.png';
import plusIcon from '../../assets/icons/grayPlus.png';
import {
    AddColumnButton,
    BurgerButton,
    HeaderContainer,
    Icon,
    MenuItem,
    MenuWrapper,
    Title,
} from './styled';
import { FC, useState } from 'react';

interface HeaderProps {
    // eslint-disable-next-line no-unused-vars
    setIsAddingColumn: (value: boolean) => void;
}

const Header: FC<HeaderProps> = ({ setIsAddingColumn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const handleAddColumn = () => {
        setIsAddingColumn(true);
        setIsMenuOpen(false);
    };

    return (
        <HeaderContainer>
            <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Icon src={burgerIcon} alt="Burger-button" />
            </BurgerButton>
            <Title>Kanban Dashboard</Title>
            <AddColumnButton onClick={handleAddColumn}>
                <Icon src={plusIcon} alt="Plus" />
            </AddColumnButton>
            {isMenuOpen && (
                <MenuWrapper>
                    <MenuItem onClick={handleAddColumn}>Add Column</MenuItem>
                </MenuWrapper>
            )}
        </HeaderContainer>
    );
};

export default Header;
