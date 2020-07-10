const data = {
	pages: {
		home: '/',
		technology: 'pages/technology/',
	},
};

describe('technologies', () => {
	it('should list the same technologies as the api', () => {
		cy.visit(data.pages.home);

		const technologiesFromDom = [];

		cy.get('[data-testid=cards-wrapper] a[href^="/"]').then((technologies) => {
			technologies.map((index, technology) => {
				let slug = technology.toString().split('/');
				slug = slug[slug.length - 1];
				technologiesFromDom[index] = slug;
				return true;
			});

			cy.request('GET', 'http://localhost:3333/technologies', {
				embed: true,
				perPage: 4,
				orderby: 'created_at',
				order: 'DESC',
			}).then((response) => {
				const technologiesFromJson = response.body.map((item) => item.slug);

				cy.expect(response.status).to.equal(200);
				cy.expect(technologiesFromJson).to.deep.equal(technologiesFromDom);
			});
		});
	});
});
