import styled from "styled-components";
import { useContext, useState } from "react";
import { Context } from "../contextApi/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseURL } from "../App";
import { mobile } from "../responsive";
import ProfilePic from "./ProfilePic";

const Container = styled.div`
	padding: 20px;
	height: 410px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Personal = styled.div`
	color: #292828;
	border-radius: 10px;
	border: 1px solid silver;
	padding: 20px;
	padding-bottom: 60px;
	width: 45%;
	height: 100%;
	position: absolute;

	${mobile({
		boxShadow: "none",
		width: "100%",
		height: "72%",
		top: "0",
		padding: "10px",
	})}
`;
const Header = styled.h2`
	${mobile({
		fontSize: "18px",
	})}
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Info = styled.div`
	margin: 10px;
	${mobile({
		margin: "8px 0px 4px 0px",
	})}
`;
const Inputs = styled.input`
	padding: 10px;
	margin: 10px;
	width: 65%;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	border: 1px solid silver;
	display: inline;
	${mobile({
		width: "70%",
		margin: "4px",
	})}
`;
const UpdateBtn = styled.button`
	margin-left: 10px;
	padding: 5px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	width: 70px;
	background-color: ${(props) => (props.isFetching ? "lightgray" : "white")};
	cursor: ${(props) => (props.isFetching ? "not-allowed" : "pointer")};
	border: 1px solid silver;

	${mobile({
		margin: " 5px ",
	})}
	&:hover {
		color: white;
		background: #703be7;
		transition: all 0.5s ease;
	}
`;
const EditBtn = styled.button`
	margin-left: 10px;
	padding: 5px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	background-color: white;
	cursor: pointer;
	width: 50px;
	border: 1px solid silver;
	${mobile({
		margin: " 5px 0px ",
	})}

	&:hover {
		color: white;
		background: #703be7;
		transition: all 0.5s ease;
	}
`;

const Left = () => {
	const { user, dispatch, isFetching } = useContext(Context);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [edit, setEdit] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username,
			email,
		};

		try {
			const res = await axios.put(
				`${baseURL}/users/${user._id}`,
				updatedUser,
				{ headers: { token: `Bearer ${user.accessToken}` } }
			);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			setEdit(false);
			toast.success("Info update successful,,,");
		} catch (err) {
			toast.error("Update failed,,,");
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};

	return (
		<Container>
			<ToastContainer style={{ fontSize: "16px" }} />
			<Personal>
				<Form>
					<ProfilePic />
					<Header>Personal Information</Header>
					<hr />
					{!edit ? (
						<>
							<Info>
								<b>Name : </b>
								{username}
							</Info>
							<Info>
								<b>E-mail : </b> {email}
							</Info>
						</>
					) : (
						<>
							<Inputs
								type="text"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
							<Inputs
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</>
					)}
				</Form>
				{!edit ? (
					<EditBtn onClick={() => setEdit(!edit)}>Edit</EditBtn>
				) : (
					<UpdateBtn
						onClick={handleSubmit}
						isFetching={isFetching}
						disabled={isFetching}>
						Update
					</UpdateBtn>
				)}
			</Personal>
		</Container>
	);
};

export default Left;
