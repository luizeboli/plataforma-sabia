import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { InputField, Form, Actions } from '../../../components/Form';
import { Title, Cell, Row } from '../../../components/Common';
import { Button } from '../../../components/Button';
import { updateUser, updateUserPassword } from '../../../services';

const MyProfile = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation(['account']);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordMessage, setPasswordMessage] = useState('');
	const [passwordLoading, setPasswordLoading] = useState(false);

	const handleSubmit = async (data) => {
		setLoading(true);
		const result = await updateUser(user.id, data);
		setLoading(false);
		if (!result) {
			setMessage(t('account:messages.error'));
		} else {
			setUser(result);
			setMessage(t('account:messages.userSuccessfullyUpdated'));
		}
	};

	const handlePasswordSubmit = async ({ currentPassword, newPassword, confirmNewPassword }) => {
		setPasswordLoading(true);

		if (newPassword !== confirmNewPassword) {
			setPasswordMessage(t('account:messages.newPasswordError'));
			setPasswordLoading(false);
			return;
		}

		const result = await updateUserPassword({ currentPassword, newPassword });
		setPasswordLoading(false);

		if (result.error) {
			if (result.error.error_code === 'PASSWORD_NOT_MATCH') {
				setPasswordMessage(result.error.message);
			} else {
				setPasswordMessage(t('account:messages.error'));
			}
		} else {
			setPasswordMessage(t('account:messages.passwordSuccessfullyUpdated'));
		}
	};

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:titles.myProfile')}
					</Title>
					<MainContent>
						<Form onSubmit={handleSubmit}>
							<InnerForm user={user} message={message} loading={loading} />
						</Form>
						<Form onSubmit={handlePasswordSubmit}>
							<PasswordForm message={passwordMessage} loading={passwordLoading} />
						</Form>
					</MainContent>
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyProfile.getInitialProps = async () => {
	return {
		namespacesRequired: ['account', 'profile'],
	};
};

const InnerForm = ({ form, user, message, loading }) => {
	const { t } = useTranslation(['account']);
	return (
		<>
			<Row>
				<Cell>
					<InputField
						form={form}
						name="full_name"
						label={t('account:labels.fullName')}
						defaultValue={user.full_name}
						placeholder={t('account:placeholders.fullName')}
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="email"
						label={t('account:labels.mainEmail')}
						defaultValue={user.email}
						type="email"
						placeholder={t('account:placeholders.mainEmail')}
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name="company"
						label={t('account:labels.institution')}
						defaultValue={user.company || ''}
						placeholder={t('account:placeholders.institution')}
						validation={{ required: true }}
					/>
				</Cell>
			</Row>
			<Row>
				<Cell align="center">
					<p>{message}</p>
				</Cell>
			</Row>
			<Actions center>
				<Button type="submit" disabled={loading}>
					{loading ? t('account:labels.updatingUser') : t('account:labels.updateUser')}
				</Button>
			</Actions>
		</>
	);
};

InnerForm.propTypes = {
	form: PropTypes.shape({}),
	user: PropTypes.shape({
		full_name: PropTypes.string,
		company: PropTypes.string,
		email: PropTypes.string,
	}),
	message: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

InnerForm.defaultProps = {
	form: {},
	user: {},
};

const PasswordForm = ({ form, message, loading }) => {
	const { t } = useTranslation(['account']);
	return (
		<>
			<Row>
				<Cell>
					<PasswordContainer>
						<span>{t('account:labels.passwordChange')}</span>
						<div>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.currentPassword')}
									name="currentPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.newPassword')}
									name="newPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
								/>
							</Cell>
							<Cell>
								<InputField
									form={form}
									label={t('account:labels.confirmNewPassword')}
									name="confirmNewPassword"
									placeholder="*****"
									type="password"
									validation={{ required: true }}
								/>
							</Cell>
						</div>
					</PasswordContainer>
				</Cell>
			</Row>
			<Row>
				<Cell align="center">
					<p>{message}</p>
				</Cell>
			</Row>
			<Actions center>
				<Button type="submit" disabled={loading}>
					{loading
						? t('account:labels.updatingPassword')
						: t('account:labels.updatePassword')}
				</Button>
			</Actions>
		</>
	);
};

PasswordForm.propTypes = {
	form: PropTypes.shape({}),
	message: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

PasswordForm.defaultProps = {
	form: {},
};

const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media screen and (max-width: 950px) {
		flex-direction: column;

		button {
			margin-bottom: 1rem;
		}
	}
`;

const MainContentContainer = styled.section`
	width: 100%;
`;

const MainContent = styled.div`
	min-height: 80vh;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 2rem;
`;

const PasswordContainer = styled.div`
	padding: 1rem;
	background-color: ${({ theme }) => theme.colors.gray98};

	> div {
		display: flex;

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			flex-direction: column;
		}
	}

	span {
		display: block;
		margin: 0 0 1rem 1rem;
		color: ${({ theme }) => theme.colors.primary};
		font-weight: bold;
	}
`;

export default MyProfile;
