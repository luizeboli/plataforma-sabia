import styled from 'styled-components';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1500;
	background: rgba(1, 1, 1, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Modal = styled.div`
	position: fixed;
	min-width: 40rem;
	z-index: 2000;
	padding: 4rem;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 0.5rem;
	box-shadow: 0px 0px 20px -5px rgba(38, 38, 38, 1);

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		min-width: 90%;
		padding: 2rem;
	}
`;

export const ModalCloseIcon = styled.button`
	background: 0;
	border: 0;
	position: absolute;
	top: 1rem;
	right: 1rem;

	svg {
		height: ${({ theme }) => theme.sizes.defaultIcon}rem;
		width: ${({ theme }) => theme.sizes.defaultIcon}rem;
		transition: color 0.3s;

		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;
