import React, { useContext } from "react";
import axios from "axios";
import { baseURL } from "../App";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../contextApi/context";
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
	height: 150px;
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
	background: ${({ dele }) => (dele ? "#703be7" : "#d6d6d6")};
	color: ${({ dele }) => (dele ? "white" : "black")};
	margin-left: ${({ dele }) => (dele ? "15px" : "18px")};
	border: none;
	border-radius: 5px;
`;
const DeletePopup = ({ setDel }) => {
	const { user } = useContext(Context);

	const hendleDelete = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.delete(`${baseURL}/users/${user._id}`, {
				headers: { token: `Bearer ${user.accessToken}` },
			});
			res && localStorage.setItem("user", null);
			res && window.location.replace("/");
		} catch {
			toast.error("Something went wrong,,,");
		}
	};
	return (
		<>
			<ToastContainer style={{ fontSize: "16px" }} />

			<Container />
			<Wrapper>
				<Header>Delete your account?</Header>
				<Text>
					Once you have delete your account it can't be undone
				</Text>
				<Btn onClick={() => setDel(false)}>Cancel</Btn>
				<Btn dele onClick={hendleDelete}>
					Delete
				</Btn>
			</Wrapper>
		</>
	);
};

export default DeletePopup;
