import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hits } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { ThemeProvider } from '../../styles';

import {
	SearchBoxContainer,
	Container,
	FilterContainer,
	FilterContainerHeader,
	MobileCloseButton,
	MobileButtonsContainer,
	FilterContainerBody,
	ResultsContainer,
	ResultsContainerHeader,
	ResultsFooter,
} from './styles';

import {
	AlgoliaSearchProvider,
	DebouncedSearchBox,
	Stats,
	SortBy,
	HitsPerPage,
	HitCard,
	Pagination,
	ClearRefinements,
	Panel,
	RefinementList,
	ToggleRefinement,
	ResultsButton,
	ClearFiltersButton,
} from '../Algolia';

import { MobileFilterButton } from '../Mobile';

const MainSearch = ({
	searchState,
	resultsState,
	onSearchStateChange,
	createURL,
	onSearchParameters,
}) => {
	const { t } = useTranslation(['search', 'common']);
	const [openMobileFilters, setOpenMobileFilters] = useState(false);

	const handleOpenMobileFilters = () => {
		setOpenMobileFilters(true);
		window.scrollTo({ top: 0 });
	};

	return (
		<AlgoliaSearchProvider
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
			onSearchParameters={onSearchParameters}
		>
			<ThemeProvider>
				<SearchBoxContainer>
					<DebouncedSearchBox placeholder={t('search:searchPlaceholder')} />
				</SearchBoxContainer>

				<Container>
					<FilterContainer openMobile={openMobileFilters}>
						<FilterContainerHeader>
							<h2>{t('common:filters')}</h2>
							<ClearRefinements placeholder={t('common:clear')} />
							<MobileCloseButton onClick={() => setOpenMobileFilters(false)}>
								<AiOutlineClose />
							</MobileCloseButton>
						</FilterContainerHeader>
						<FilterContainerBody>
							<Panel header={t('common:technologies')}>
								<ToggleRefinement
									attribute="private"
									label={t('search:filterOnlyPublic')}
									value={0}
								/>
							</Panel>
							<Panel header={t('common:category')}>
								<RefinementList
									attribute="category"
									placeholder={t('search:searchCategoryPlaceholder')}
								/>
							</Panel>
							<MobileButtonsContainer>
								<ResultsButton onClick={() => setOpenMobileFilters(false)} />
								<ClearFiltersButton />
							</MobileButtonsContainer>
						</FilterContainerBody>
					</FilterContainer>
					<ResultsContainer>
						<ResultsContainerHeader>
							<Stats />
							<SortBy
								defaultRefinement="searchable_data"
								items={[
									{
										label: t('search:sortByRelevance'),
										value: 'searchable_data',
									},
									{
										label: t('search:sortByInstallationTimeAsc'),
										value: 'searchable_data_installation_time_asc',
									},
									{
										label: t('search:sortByInstallationTimeDesc'),
										value: 'searchable_data_installation_time_desc',
									},
								]}
							/>
							<HitsPerPage
								items={[
									{
										label: t('search:perPage', { results: 12 }),
										value: 12,
									},
									{
										label: t('search:perPage', { results: 24 }),
										value: 24,
									},
									{
										label: t('search:perPage', { results: 36 }),
										value: 36,
									},
								]}
								defaultRefinement={12}
							/>
						</ResultsContainerHeader>
						<Hits hitComponent={HitCard} />
						<MobileFilterButton onClick={handleOpenMobileFilters}>
							{t('search:filter')}
						</MobileFilterButton>
						<ResultsFooter>
							<Pagination />
						</ResultsFooter>
					</ResultsContainer>
				</Container>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

MainSearch.propTypes = {
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
};

MainSearch.defaultProps = {
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
};

export default MainSearch;
