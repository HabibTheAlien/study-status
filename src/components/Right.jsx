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
	height: 410px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	${mobile({
		width: "100%",
		position: "absolute",
		top: "55%",
		height: "55%",
	})}
`;
const Personal = styled.div`
	padding: 20px;
	padding-bottom: 60px;
	border-radius: 10px;
	width: 45%;
	height: 100%;
	border: 1px solid silver;

	position: absolute;

	${mobile({
		boxShadow: "none",
		border: "1px solid silver ",
		width: "100%",
		position: "absolute",
		top: "90px",
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
const Btn = styled.button`
	padding: 5px;
	border: none;
	border: 1px solid silver;
	margin-left: 15px;
	border-radius: 5px;
	font-size: 15px;
	background: white;
	cursor: pointer;
`;
const I = styled.i`
	margin-left: 20px;
	color: #1dbf73;
	font-size: 40px;
	cursor: pointer;
	${mobile({
		marginLeft: "1px",
	})}
`;
const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
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
				<Desc style={{ backgroundColor: status ? "#1dbf73" : "red" }}>
					{status ? (
						<p>Your Study Status is activated</p>
					) : (
						<p>Your Study Status is deactivated now</p>
					)}
				</Desc>
				<Bottom>
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
							style={{
								color: "gray",
							}}
							className="fas fa-toggle-off"
							onClick={() => setStatus(!status)}
						/>
					)}

					<Btn onClick={handleStatus}> Save</Btn>
				</Bottom>
			</Personal>
		</Container>
	);
};

export default Right;
