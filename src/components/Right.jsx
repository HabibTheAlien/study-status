import { useState, useContext } from "react";
import styled from "styled-components";
import { Context } from "../contextApi/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseURL } from "../App";
import { mobile } from "../responsive";

const Container = styled.div`
	padding: 20px;
	margin-top: 0;
	height: calc(100vh - 70px);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	${mobile({
		width: "100%",
		position: "absolute",
		top: "43%",
		height: "55%",
	})}
`;
const Personal = styled.div`
	padding: 20px;
	padding-bottom: 60px;
	border-radius: 10px;
	width: 45%;
	height: 80%;
	position: absolute;
	box-shadow: 3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	${mobile({
		boxShadow: "none",
		border: "1px solid silver ",
		width: "100%",
		position: "absolute",
		top: "70px",
	})}
`;

const Desc = styled.div`
	border-radius: 5px;
	font-size: 20px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90%;
	color: white;
	margin-bottom: 25px;
	text-align: center;
	${mobile({
		testAlign: "center",
		fontSize: "14px",
	})}
`;
const Span = styled.span`
	/* color: crimson; */
	text-align: center;
	${mobile({
		testAlign: "center",
		fontSize: "14px",
		margin: "5px 30px",
	})}
`;
const SaveBtn = styled.button`
	padding: 5px;
	border: none;
	color: white;
	background-color: teal;
	margin-left: 15px;
	border-radius: 5px;
	font-size: 15px;
	cursor: pointer;

	${mobile({
		marginRight: "15px",
	})}
`;
const I = styled.i`
	margin-left: 50px;
	color: blue;
	font-size: 40px;
	cursor: pointer;
	${mobile({
		position: "absolute",
		top: "80%",
		left: "80%",
		marginLeft: "15px",
	})}
`;

const Right = () => {
	const { user, dispatch } = useContext(Context);
	const [status, setStatus] = useState(user.status);

	const handleStatus = async () => {
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			status,
		};

		try {
			const res = await axios.put(
				`${baseURL}/users/${user._id}`,
				updatedUser,
				{ headers: { token: `Bearer ${user.accessToken}` } }
			);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			toast.success("Status update successful,,,");
		} catch (err) {
			toast.error("Update failed,,,");
			dispatch({ type: "UPDATE_FAILURE" });
		}
	};
	return (
		<Container>
			<ToastContainer style={{ fontSize: "16px" }} />
			<Personal>
				<Desc style={{ backgroundColor: status ? "green" : "red" }}>
					{status ? (
						<p>Your Study Status is activated</p>
					) : (
						<p>Your Study Status is deactivated now</p>
					)}
				</Desc>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					{status ? (
						<Span>Turn off Status</Span>
					) : (
						<Span>Turn on Status</Span>
					)}
					{status ? (
						<I
							className="fas fa-toggle-on"
							onClick={() => setStatus(!status)}
						/>
					) : (
						<I
							className="fas fa-toggle-off"
							onClick={() => setStatus(!status)}
						/>
					)}

					<SaveBtn onClick={handleStatus}> Save</SaveBtn>
				</div>
			</Personal>
		</Container>
	);
};

export default Right;
