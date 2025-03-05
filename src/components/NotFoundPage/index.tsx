import { HomeLink, NotFoundWrapper, Subtitle, Title } from './styled';

const NotFoundPage = () => {
    return (
        <NotFoundWrapper>
            <Title>404</Title>
            <Subtitle>This page was not found😥</Subtitle>
            <HomeLink to="/">Return to main page</HomeLink>
        </NotFoundWrapper>
    );
};

export default NotFoundPage;
