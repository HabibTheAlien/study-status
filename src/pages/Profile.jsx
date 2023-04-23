import styled from "styled-components";
import { mobile } from "../responsive";
import Left from "../components/Left";
import Right from "../components/Right";

const Container = styled.div`
	padding: 20px;
	height: calc(100vh - 120px);
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Wrapper = styled.div`
	margin-top: 50px;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	${mobile({ display: "flex", flexDirection: "column" })}
`;
const Title = styled.h1`
	text-align: center;
	position: absolute;
	top: 3%;
	margin-bottom: 15px;
	${mobile({ marginBottom: "1px", top: "2%", fontSize: "22px" })}
`;

const Profile = () => {
	return (
		<Container>
			<Title>Profile Page</Title>
			<Wrapper>
				<Left />
				<Right />
			</Wrapper>
		</Container>
	);
};

export default Profile;
