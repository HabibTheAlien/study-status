import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "../../App";
import userIcon from "../../assets/user.png";
import "./singleUser.css";

const SingleUser = () => {
	const [user, setUser] = useState({});
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(`${baseURL}/users/find/${path}`);
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [path]);

	let userImg = userIcon;
	if (user.profilePic) {
		userImg = user.profilePic;
	} else {
		userImg = userIcon;
	}
	return (
		<div className="singleUser">
			<h3 className="singleUserHeader">{user.username}'s Profile</h3>
			<div className="singleUserWrapper">
				<div className="singleUserTop">
					<div className="singleUserImg">
						<img src={userImg} alt="" />
					</div>
					<div className="singleUserDetails">
						<p>{user.username}</p>
					</div>
				</div>

				<div className="singleUserBottom">
					<div className="singleUserBottomStatus">
						<p>Study Status</p>
						{user.status ? (
							<span>ON</span>
						) : (
							<span style={{ background: "red" }}>OFF</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleUser;
