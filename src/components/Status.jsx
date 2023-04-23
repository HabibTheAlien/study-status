import styled from "styled-components";
import avtar from "../assets/user.png";
import { mobile } from "../responsive";

const Container = styled.div`
	width: 250px;
	height: 150px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
	padding: 10px;
	border-radius: 10px;

	${mobile({
		padding: "10px",
		height: "100px",
		weight: "100%",
	})}
`;
const Left = styled.div``;
const Avtar = styled.img`
	cursor: pointer;
	width: 70px;
	height: 70px;
	margin-right: 5px;
	background-color: white;
	object-fit: contain;
	border-radius: 50%;
	${mobile({ height: "60px", width: "60px" })}
`;
const Right = styled.div``;
const Text = styled.p`
	color: white;
	font-size: 18px;
	text-align: center;
	${mobile({ fontSize: "15px" })}
`;

const Name = styled.span`
	font-weight: 600;
`;
const Status = ({ data }) => {
	return (
		<Container
			style={{ backgroundColor: data.status ? "#1dbf73" : "#ff0000" }}>
			<Left>
				{data.profilePic ? (
					<Avtar src={data.profilePic} alt="" />
				) : (
					<Avtar src={avtar} alt="" />
				)}
			</Left>
			<Right>
				{data.status ? (
					<Text>
						<Name>{data.username}&nbsp;</Name>
						is now studing
					</Text>
				) : (
					<Text>
						<Name>{data.username}&nbsp;</Name> is not studing
					</Text>
				)}
			</Right>
		</Container>
	);
};

export default Status;
