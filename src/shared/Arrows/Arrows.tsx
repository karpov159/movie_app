import Button from '../../shared/Button/Button';

interface ArrowsData {
	currentPage: number;
	onNextPage: () => void;
	onPreviousPage: () => void;
	isNextArrowShowed?: boolean | undefined;
}

const Arrows = ({
	currentPage,
	onNextPage,
	onPreviousPage,
	isNextArrowShowed = true,
}: ArrowsData) => {
	const previousButton =
		currentPage > 1 ? (
			<Button
				handleClick={onPreviousPage}
				children='< Previous'
				buttonClass='page-button page-button_mr'
			/>
		) : null;

	const nextButton = isNextArrowShowed ? (
		<Button
			handleClick={onNextPage}
			children='Next >'
			buttonClass='page-button'
		/>
	) : null;

	return (
		<div className='arrows'>
			{previousButton}

			{nextButton}
		</div>
	);
};

export default Arrows;
