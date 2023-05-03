import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import userIcon from "../../assets/user.png";
import { Context } from "../../contextApi/context";
import "./profilePageEdit.css";

const ProfilePageEdit = () => {
	const { user, dispatch, isFetching } = useContext(Context);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [status, setStatus] = useState(user.status);
	const [file, setFile] = useState(null);
	const [picURL, setPicURL] = useState(user.profilePic);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (file) {
			const handlePic = async () => {
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
			handlePic();
		}
	}, [file]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username,
			email,
			status,
			profilePic: picURL,
		};

		try {
			const res = await axios.put(
				`${baseURL}/users/${user._id}`,
				updatedUser,
				{ headers: { token: `Bearer ${user.accessToken}` } }
			);
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
			toast.success("Profile update successful,,,");
		} catch (err) {
			toast.error("Update failed,,,");
			dispatch({ type: "UPDATE_FAILURE" });
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

	let bg = "#703be7";
	let c = "pointer";
	if (isLoading) {
		bg = "silver";
		c = "not-allowed";
	} else {
		bg = "#703be7";
		c = "pointer";
	}
	return (
		<div className="profilePageEdit">
			<ToastContainer style={{ fontSize: "16px" }} />
			<h3 className="profilePageEditHeader">Edit Profile</h3>
			<div className="profilePageEditWrapper">
				<div className="profilePageEditImg">
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<img src={userImg} alt="" />

					<label htmlFor="fileInput">
						{isLoading ? (
							<i className="fas fa-spinner fa-pulse" />
						) : (
							<span>
								<i className="fa-solid fa-camera" />
								Change Picture
							</span>
						)}
					</label>
				</div>
				<form className="profilePageEditForm" onSubmit={handleSubmit}>
					<span>Username</span>
					<input
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<span>Email</span>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<div className="profilePageEditStatus">
						<p>Status</p>
						{status ? (
							<i
								onClick={() => setStatus(!status)}
								className="fas fa-toggle-on"
								style={{ color: "#1dbf73" }}
							/>
						) : (
							<i
								onClick={() => setStatus(!status)}
								className="fas fa-toggle-off"
							/>
						)}
					</div>

					{isFetching ? (
						<i className="fas fa-spinner fa-pulse" />
					) : (
						<button
							disabled={isLoading}
							style={{ backgroundColor: bg, cursor: c }}
							type="submit">
							Save Changes
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default ProfilePageEdit;
