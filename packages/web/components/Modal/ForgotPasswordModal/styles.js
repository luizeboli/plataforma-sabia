import styled from 'styled-components';

export const StyledForgotPasswordModal = styled.div`
	width: 50rem;
	padding: 0rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;

export const StyledLabel = styled.div`
	padding: 4rem;
	font-family: 'Museo', sans-serif;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
	width: 58rem;
	margin: -4rem 0 4rem -4rem;
	font-size: 3rem;
	height: auto;
	background-color: ${({ theme }) => theme.colors.primary};
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 75rem;
		margin-left: -2rem;
		margin-top: -2rem;
	}
`;

export const ActionsRegister = styled.div`
	width: 100%;
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font: sans-serif;
	button {
		background-color: ${({ theme }) => theme.colors.secondary};
		padding: 1rem;
		font: 1em;
		width: 50%;
		font-weight: 200;
	}
`;
export const LabelGroups = styled.div`
	width: 50%;
	font-size: 1.5rem;
	font-weight: 100;
	padding-left: 2rem;
	display: flex;
	flex-direction: row;

	> a {
		margin: 0rem;
		padding: 0rem;
	}
`;
export const StyledSpan = styled.div`
	color: ${({ theme }) => theme.colors.lightGray};
	font-weight: 500;
	margin: 0rem;
	padding-right: 0.5rem;
`;
export const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 500;
`;
