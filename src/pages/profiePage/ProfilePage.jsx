import { useContext } from "react";
import { Link } from "react-router-dom";
import userIcon from "../../assets/user.png";
import { Context } from "../../contextApi/context";
import "./profilePage.css";

const ProfilePage = () => {
	const { user } = useContext(Context);

	let userImg = userIcon;
	if (user.profilePic) {
		userImg = user.profilePic;
	} else {
		userImg = userIcon;
	}
	return (
		<div className="profilePage">
			<h3 className="profilePageHeader">My Profile</h3>
			<div className="profilePageWrapper">
				<div className="profilePageTop">
					<div className="profilePageImg">
						<img src={userImg} alt="" />
					</div>
					<div className="profilePageDetails">
						<p>{user.username}</p>
						<span>{user.email}</span>
						<Link to="/edit" className="link">
							<button>
								<i className="fa-solid fa-pen" /> Edit Profile
							</button>
						</Link>
					</div>
				</div>

				<div className="profilePageBottom">
					<div className="profilePageBottomStatus">
						<p>Study Status</p>
						{user.status ? (
							<span>ON</span>
						) : (
							<span style={{ background: "red" }}>OFF</span>
						)}
					</div>
					<Link to="/settings" className="link">
						<div className="profilePageBottomSettings">
							Settiengs
							<i className="fa-solid fa-chevron-right" />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
