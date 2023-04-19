import styled from "styled-components";

const Container = styled.h1`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	font-size: 55px;
	text-align: center;
`;
const PageNotFound = () => {
	return <Container>404 Page Not Found !!!</Container>;
};

export default PageNotFound;
