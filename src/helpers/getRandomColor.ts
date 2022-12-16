const getRandomColor = () => {
	const colors = [
		'rgb(243, 121, 76)',
		'rgb(48 102 112)',
		'rgb(204, 130, 238)',
		'rgb(98, 206, 179)',
		'rgb(153, 206, 48)',
	];

	const num = Math.floor(Math.random() * colors.length);

	return colors[num];
};

export default getRandomColor;
