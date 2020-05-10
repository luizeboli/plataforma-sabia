import styled, { css } from 'styled-components';

export const InputFieldWrapper = styled.div`
	font-size: 1.4rem;
	font-size: 1.4rem;
	line-height: 14px;

	${({ hasError }) =>
		hasError &&
		css`
			> input {
				border: 1px solid ${({ theme }) => theme.colors.orange};
			}
			> .react-select-container .react-select__control {
				border-color: ${({ theme }) => theme.colors.orange};
			}
		`}
`;

export const InputLabel = styled.label`
	color: ${({ theme }) => theme.colors.lightGray};
	font-weight: 700;
`;

export const InputError = styled.span`
	color: ${({ theme }) => theme.colors.orange};
	margin: 0 0 1rem 0;
	display: inline-block;
`;
