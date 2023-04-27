import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
	z-index: 10000;
	background: black;
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	opacity: 0.3;
`;
const Wrapper = styled.div`
	z-index: 10001;
	background-color: white;
	width: 320px;
	height: 170px;
	border-radius: 10px;
	color: black;
	position: absolute;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 15px;
`;
const Header = styled.h3`
	font-size: 18px;
`;
const Text = styled.p`
	margin: 10px 0px;
`;
const Btn = styled.button`
	cursor: pointer;
	/* margin: 5px; */
	padding: 7px;
	font-size: 17px;
	width: 120px;
	background: none;
	font-weight: bold;
	background: ${({ del }) => (del ? "#703be7" : "#d6d6d6")};
	color: ${({ del }) => (del ? "white" : "black")};
	margin-left: ${({ del }) => (del ? "15px" : "16px")};
	border: none;
	border-radius: 5px;
`;
const PopUp = () => {
	const [del, setDel] = useState("");
	const [can, setCan] = useState("");
	console.log(del);
	console.log(can);
	const hendleCancel = () => {
		setCan("Hello from cancle");
	};
	const hendleDelete = () => {
		setDel("Hello from delete");
	};
	return (
		<>
			<Container></Container>
			<Wrapper>
				<Header>Delete this entire conversation?</Header>
				<Text>
					Once you have delete your copy of the conversation it can't
					be undone
				</Text>
				<Btn onClick={hendleCancel}>Cancel</Btn>
				<Btn del onClick={hendleDelete}>
					Delete
				</Btn>
			</Wrapper>
		</>
	);
};

export default PopUp;
