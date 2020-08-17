import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const HitCard = ({
	hit: {
		id,
		title,
		category,
		private: privateTechnology,
		patent,
		thumbnail,
		installation_time,
		created_at: date,
		likes,
		slug,
	},
}) => {
	return (
		<Card
			id={id}
			title={title}
			category={category}
			privateTechnology={!!privateTechnology}
			patent={!!patent}
			thumbnail={thumbnail}
			date={new Date(date)}
			likes={likes}
			installation_time={installation_time}
			url={`t/${slug}`}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		private: PropTypes.number,
		patent: PropTypes.number,
		thumbnail: PropTypes.string,
		created_at: PropTypes.string,
		likes: PropTypes.number,
		installation_time: PropTypes.number,
		slug: PropTypes.string,
	}).isRequired,
};

export default HitCard;
