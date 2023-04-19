import avtar from "../assets/profile.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../contextApi/context";
import { mobile } from "../responsive";

const Container = styled.div`
	z-index: 1000;
	height: 70px;
	background: crimson;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
	padding: 5px 20px;
	position: sticky;
`;

const Left = styled.div`
	cursor: pointer;
`;
const Logo = styled.h1`
	font-size: 35px;
	${mobile({ fontSize: "22px" })}
`;
const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Avtar = styled.img`
	cursor: pointer;
	width: 50px;
	height: 50px;
	object-fit: cover;
	border-radius: 50%;
	${mobile({ width: "30px", height: "30px" })}
`;
const Btn = styled.button`
	cursor: pointer;
	margin-left: 15px;
	color: white;
	background: teal;
	padding: 5px 10px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	${mobile({ fontSize: "12px", padding: "5px" })}
`;
const Name = styled.span`
	cursor: pointer;
	color: white;
	padding: 10px;
	font-size: 18px;
	${mobile({ display: "none" })}
`;

const Navbar = () => {
	const { user, dispatch } = useContext(Context);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace("/");
	};

	return (
		<Container>
			<Left>
				<Link className="link" to="/">
					<Logo>Hexagon</Logo>
				</Link>
			</Left>

			<Right>
				{user ? (
					<>
						<Link className="link" to="/profile">
							{user.profilePic ? (
								<Avtar src={user.profilePic} alt="" />
							) : (
								<Avtar src={avtar} alt="" />
							)}
						</Link>
						<Link className="link" to="/profile">
							<Name>{user.username}</Name>
						</Link>
						<Btn onClick={handleLogout}>Logout</Btn>
					</>
				) : (
					<Link className="link" to="/login">
						<Btn>Login</Btn>
					</Link>
				)}
			</Right>
		</Container>
	);
};

export default Navbar;
