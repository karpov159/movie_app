const getRandomColor = () => {
	const colors = [
		'rgb(243, 121, 76)',
		'rgb(87, 218, 241)',
		'rgb(204, 130, 238)',
		'rgb(98, 206, 179)',
		'rgb(153, 206, 48)',
	];

	const num = Math.floor(Math.random() * colors.length);

	return colors[num];
};

export default getRandomColor;
