import { useState } from "react";
import "./popUpElement.css";

const PopUpElement = () => {
	const deletStyle = {
		background: "#703be7",
		color: "white",
		marginLeft: "15px",
	};

	const [del, setDel] = useState("");
	const [can, setCan] = useState("");
	console.log(del);
	console.log(can);
	const hendleCancel = () => {
		setCan("cancel");
		console.log("Hello from cancle");
	};
	const hendleDelete = () => {
		setDel(" delete");
		console.log("Hello from delete");
	};
	return (
		<>
			<div className="popUpElement" />
			<div className="popUpElementWrapper">
				<h3 className="popUpElementHeader">
					Delete this entire conversation?
				</h3>
				<p className="popUpElementText">
					Once you have delete your copy of the conversation it can't
					be undone
				</p>
				<button onClick={hendleCancel}>Cancel</button>
				<button style={deletStyle} onClick={hendleDelete}>
					Delete
				</button>
			</div>
		</>
	);
};

export default PopUpElement;
