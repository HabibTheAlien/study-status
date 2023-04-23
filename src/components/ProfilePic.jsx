import styled from "styled-components";
import userIcon from "../assets/user.png";
import { useContext, useState } from "react";
import { Context } from "../contextApi/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseURL } from "../App";
import { mobile } from "../responsive";

const Header = styled.h2`
	${mobile({
		fontSize: "18px",
	})}
`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	cursor: pointer;
`;

const Image = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin: 20px;
	${mobile({
		width: "50px",
		height: "50px",
		margin: "10px",
	})}
`;

const Btn = styled.button`
	padding: 5px;
	border: none;
	margin-left: 15px;
	border-radius: 5px;
	font-size: 15px;
	border: 0.1px solid silver;
	background-color: ${(props) => (props.isLoading ? "lightgray" : "white")};
	cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
`;

const ProfilePic = () => {
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [picURL, setPicURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	console.log(picURL);
	const handlePic = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "auth-image");
		data.append("cloude_name", "djfnygr4y");

		try {
			const res = await axios.post(
				"https://api.cloudinary.com/v1_1/djfnygr4y/image/upload",
				data
			);
			setPicURL(res.data.url);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDbPicURL = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			profilePic: picURL,
		};

		try {
			const res = await axios.put(
				`${baseURL}/users/${user._id}`,
				updatedUser,
				{ headers: { token: `Bearer ${user.accessToken}` } }
			);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			toast.success("Picture update successful,,,");
			setFile(false);
		} catch (err) {
			toast.error("Pictur update failed,,,");
			dispatch({ type: "UPDATE_FAILURE" });
			console.log(err);
		}
	};

	let userImg = userIcon;
	if (file) {
		userImg = URL.createObjectURL(file);
	} else if (user.profilePic) {
		userImg = user.profilePic;
	} else {
		userImg = userIcon;
	}

	return (
		<>
			<ToastContainer style={{ fontSize: "16px" }} />
			<Header>Profile Picture</Header>
			<hr />
			<ImageContainer>
				<Image src={userImg} alt="" />
				<div>
					{file ? (
						<>
							{picURL ? (
								<Btn onClick={handleDbPicURL}>Confirm Save</Btn>
							) : (
								<Btn
									isLoading={isLoading}
									disabled={isLoading}
									onClick={handlePic}>
									Save
								</Btn>
							)}
						</>
					) : (
						<label htmlFor="fileInput">
							<span
								style={{
									cursor: "pointer",
									padding: "5px",
									marginLeft: "15px",
									border: ".1px solid silver",
									borderRadius: "5px",
									fontSize: "15px",
								}}>
								Upload
							</span>
						</label>
					)}
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
			</ImageContainer>
		</>
	);
};

export default ProfilePic;
