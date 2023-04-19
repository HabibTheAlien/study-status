const List = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "22px",
				fontFamily: "sans-serif",
			}}
		>
			<h1>React Boilar Plate</h1>
			<ul>
				<li>React</li>
				<li>SCSS</li>
				<li>React-Router-Dom</li>
				<li>Styled-Components</li>
			</ul>
		</div>
	);
};

export default List;
