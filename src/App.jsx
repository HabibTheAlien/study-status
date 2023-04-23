import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import { useContext } from "react";
import { Context } from "./contextApi/context.js";

export const baseURL = "https://stat16thserver.netlify.app/api";
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
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
