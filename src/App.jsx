import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useContext } from "react";
import { Context } from "./contextApi/context.js";
import ProfilePage from "./pages/profiePage/ProfilePage.jsx";
import ProfilePageEdit from "./pages/profilePageEdit/ProfilePageEdit.jsx";
import Settings from "./pages/settings/Settings.jsx";
import SingleUser from "./components/singelUser/SingleUser.jsx";

export const baseURL = "https://m32.onrender.com/api";
// export const baseURL = "http://localhost:8800/api";

const App = () => {
	const { user } = useContext(Context);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="/register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
					<Route path="/single/:id" element={<SingleUser />} />
					<Route path="/profile" element={<ProfilePage />} />
					{/* <Route path="/test" element={< />} /> */}
					<Route path="/edit" element={<ProfilePageEdit />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
