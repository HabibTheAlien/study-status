import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Container = styled.div`
	z-index: 10000;
	background: black;
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	opacity: 0.3;
`;
const Wrapper = styled.div`
	z-index: 10001;
	position: ab solute;
	top: 0;

	width: 100%;
	height: 4px;
	background-color: #e4e4e4;
	border-radius: 4px;
	overflow: hidden;
`;

const Bar = styled.div`
	z-index: 100091;
	width: ${(props) => props.progress}%;
	height: 100%;
	background-color: #1877f2;
	transition: width 0.3s ease-in-out;
`;

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((progress) => progress + 1);
		}, 50);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Wrapper>
				<Bar progress={progress} />
			</Wrapper>
			<Container />
		</>
	);
};

export default ProgressBar;
