import burgerIcon from '../../assets/images/burger.png';
import plusIcon from '../../assets/images/grayPlus.png';
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

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <HeaderContainer>
            <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Icon src={burgerIcon} alt="Burger-button" />
            </BurgerButton>
            <Title>Kanban Dashboard</Title>
            <AddColumnButton>
                <Icon src={plusIcon} alt="Plus" />
            </AddColumnButton>
            {isMenuOpen && (
                <MenuWrapper>
                    <MenuItem>Add Column</MenuItem>
                </MenuWrapper>
            )}
        </HeaderContainer>
    );
};

export default Header;
