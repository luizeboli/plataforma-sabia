import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Container, Message } from './styles';
import { Button } from '../../components/Button';
import { useModal } from '../../hooks';

const ConfirmAccount = () => {
	const router = useRouter();
	const token = router.query.token.replace(' ', '+');
	const { t } = useTranslation(['common']);
	const [loading, setLoading] = useState(false);
	const { openModal } = useModal();

	const handleConfirm = async () => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/auth/confirm-account`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ token, scope: 'web' }),
		});

		if (response.status === 200) {
			openModal('login', { message: t('common:verifiedEmail') });
		} else {
			openModal('login', { message: 'Link invalido' });
		}
		setLoading(false);
	};

	return (
		<Container>
			<Message>
				<img src="/logo.svg" alt={t('common:logoDesc')} />
				<br />
				<Button onClick={handleConfirm}>
					{loading ? t('common:wait') : t('common:confirmEmail')}
				</Button>
				<br />
			</Message>
		</Container>
	);
};
export default ConfirmAccount;
