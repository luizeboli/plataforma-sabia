describe('user', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('can login and log out', () => {
		cy.signIn();
		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');

		cy.get('#email').should('not.exist');
		cy.get('#password').should('not.exist');

		cy.findByText(/^(entrar|sign in)$/i).should('not.exist');
		cy.get('div[class*=LoginBox] button[type=button]').click();
		cy.get('button[class*=LogoutButton]').click();
		cy.findByText(/^(entrar|sign in)$/i).should('exist');
	});

	it('logging in with wrong credentials yields error in the login modal', () => {
		cy.signIn({
			openModal: true,
			email: 'thismeaildoesnotexist@gmail.com',
			password: '123123123',
		});

		cy.get('div[class*=LoginBox]').should('exist');
	});

	it('cannot create a new technology without being logged in', () => {
		cy.get('a[href="/technology/new"]').click();

		// should see the login modal.
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');

		cy.signIn({ openModal: false });
		cy.findByText(/^(entrar|sign in)$/i)
			.should('not.exist')
			.get('div[class*=FormWizardContainer]')
			.should('exist');
	});
});
