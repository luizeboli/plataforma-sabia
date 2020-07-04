import React from 'react';
import { FaRegListAlt, FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';

import { Container, UserMsg, SectionTitle, SectionItem } from './styles';

const UserProfile = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
	const { t } = useTranslation(['profile']);

	const handleLogout = async () => {
		await router.push('/');
		logout();
	};

	const goTo = (route) => {
		const path = `/user/my-account${route}`;
		if (router.pathname === path) {
			return;
		}
		router.push(path);
	};

	return (
		<Container>
			<UserMsg>
				<SafeHtml html={t('welcomeUser', { user: user?.first_name || t('user') })} />
			</UserMsg>
			<SectionTitle>{t('userArea')}</SectionTitle>
			<SectionItem onClick={() => goTo('')}>
				<FaRegUserCircle />
				{t('myProfile')}
			</SectionItem>
			<SectionTitle>{t('researcherArea')}</SectionTitle>
			<SectionItem onClick={() => goTo('/technologies')}>
				<FaRegListAlt />
				{t('myTechnologies')}
			</SectionItem>
			<SectionItem onClick={handleLogout}>
				<AiOutlineLogout />
				{t('logout')}
			</SectionItem>
		</Container>
	);
};

export default UserProfile;
