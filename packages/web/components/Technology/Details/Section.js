import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Section = ({ title, color = 'primary', hideWhenIsEmpty = true, children = [] }) => {
	const filtered = React.Children.toArray(children).filter(({ props }) => props?.value);

	if (!filtered.length && hideWhenIsEmpty) {
		return null;
	}

	return (
		<Container>
			<Title color={color}>
				<h4>{title}</h4>
			</Title>
			{children}
		</Container>
	);
};

export const Container = styled.div`
	margin-left: 1rem;
	padding: 2rem 0;
`;

export const Title = styled.div`
	${({ color, theme: { colors } }) => css`
		border-bottom: 4px solid ${colors[color]};
		width: calc(100% - 1rem);
		margin: 2rem 0;

		&:first-child {
			margin-top: 0;
		}

		h4 {
			display: inline-block;
			background-color: ${colors[color]};
			color: ${colors.white};
			padding: 2.5rem 3rem;
			font-weight: 600;
			font-size: 1.8rem;
			line-height: 2rem;
			text-transform: uppercase;
			margin-bottom: -4px;
		}
	`}
`;

Section.propTypes = {
	title: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	hideWhenIsEmpty: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
};

export default Section;
