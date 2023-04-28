import styled from "styled-components";
import { mobile } from "../responsive";
import Left from "../components/Left";
import Right from "../components/Right";
import PopUp from "../components/PopUp";
import { useState } from "react";

const Container = styled.div`
	padding: 20px;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Wrapper = styled.div`
	margin-top: 70px;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	${mobile({ display: "flex", flexDirection: "column", marginTop: "30px" })}
`;
const Title = styled.h1`
	text-align: center;
	position: absolute;
	top: 3%;
	margin-bottom: 15px;
	${mobile({ marginBottom: "1px", top: "2%", fontSize: "22px" })}
`;
const DeleteBtn = styled.button`
	padding: 10px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	cursor: pointer;
	border: 1px solid silver;
	background: white;
	position: absolute;
	left: 44.7%;

	${mobile({
		bottom: "20px",
		left: "34%",
	})}
`;

const Profile = () => {
	const [del, setDel] = useState(false);
	return (
		<>
			{del && <PopUp setDel={setDel} />}
			<Container>
				<Title>Profile Page</Title>
				<Wrapper>
					<Left />
					<Right />
				</Wrapper>
			</Container>
			<DeleteBtn onClick={() => setDel(!del)}>Delete Account</DeleteBtn>
		</>
	);
};

export default Profile;
