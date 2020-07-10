import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme, useModal } from '../hooks';
import { apiPost } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, technologies }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	useEffect(() => {
		if (emailConfirmation) {
			openModal('login', { message: t('common:verifiedEmail') });
		}
	}, [emailConfirmation, openModal, t]);

	return (
		<>
			<Hero />
			{!!technologies?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={technologies}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	let emailConfirmation = false;

	if (req && req.query && req.query.token) {
		const token = req.query.token.replace(' ', '+');
		const response = await apiPost('auth/confirm-account', {
			token,
			scope: 'web',
		});

		if (response.status === 200) {
			emailConfirmation = true;
		}
	}

	let technologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderby: 'created_at',
		order: 'DESC',
		taxonomy: 'category',
	});

	technologies = technologies.map((technology) => {
		return {
			...technology,
			url: `/${technology.slug}`,
		};
	});

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		emailConfirmation,
		technologies,
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	technologies: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: [],
};

export default Home;
