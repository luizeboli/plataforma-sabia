import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillQuestionCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

const Icon = styled(AiFillQuestionCircle)`
	width: 4rem;
	height: 4rem;
	margin: 0.6rem 0.5rem;
	fill: ${({ theme }) => theme.colors.mediumGray};
	transition: fill 0.2s;
	:hover {
		cursor: pointer;
		fill: ${({ theme }) => theme.colors.darkGray};
	}
`;

const Help = ({ id, HelpComponent }) => {
	return (
		<>
			<Icon data-tip data-for={id} />
			<ReactTooltip uuid="uuid" id={id} multiline type="dark" place="bottom" effect="solid">
				{HelpComponent}
			</ReactTooltip>
		</>
	);
};

Help.propTypes = {
	id: PropTypes.string,
	HelpComponent: PropTypes.node,
};

Help.defaultProps = {
	id: '',
	HelpComponent: <p>Help Text</p>,
};

export default Help;
