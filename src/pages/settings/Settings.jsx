import { Context } from "../../contextApi/context";
import { useContext, useState } from "react";
import "./settings.css";
import DeletePopup from "../../components/DeletePopup";

const Settings = () => {
	const { dispatch } = useContext(Context);
	const [del, setDel] = useState(false);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace("/");
	};

	return (
		<>
			{del && <DeletePopup setDel={setDel} />}
			<div className="settings">
				<div className="settingsLogout" onClick={handleLogout}>
					Log out
					<i className="fa-solid fa-arrow-right-from-bracket" />
				</div>
				<div
					className="settingsDeleteAccount"
					onClick={() => setDel(true)}>
					Delete Account
					<i className="fa-solid fa-trash-can" />
				</div>
			</div>
		</>
	);
};

export default Settings;
