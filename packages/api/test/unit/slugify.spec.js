/* eslint-disable func-names */
const { test } = use('Test/Suite')('Slugify');
const { createUniqueSlug, incrementSlugSuffix } = require('../../app/Utils/slugify');

function StubModel(first = null) {
	this.query = function() {
		return this;
	};
	this.where = function() {
		return this;
	};
	this.orderBy = function() {
		return this;
	};
	this.first = function() {
		return first;
	};
}

test('returns a new unique slug WITHOUT sufix when not stored previously', async ({ assert }) => {
	const myUniqueSlug = await createUniqueSlug(new StubModel(), 'My Cool Title');
	assert.equal(myUniqueSlug, 'my-cool-title');
});

test('returns a new unique slug WITH sufix when stored previously', async ({ assert }) => {
	const myUniqueSlug = await createUniqueSlug(
		new StubModel({ slug: 'stored-previously' }),
		'Stored previsouly',
	);
	assert.equal(myUniqueSlug, 'stored-previously-1');
});

test('add the suffix using the last part of the slug + 1', async ({ assert }) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-5');
	assert.equal(mySlugWithouSuffix, 'new-slug-6');
});

test('add the suffix using the last part of the slug + 1 regardless of suffix value', async ({
	assert,
}) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-9');
	assert.equal(mySlugWithouSuffix, 'new-slug-10');
});

test('add the suffix using the last part of the slug + 1 regardless of suffix value (2 digits)', async ({
	assert,
}) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-10');
	assert.equal(mySlugWithouSuffix, 'new-slug-11');
});

test('add the first suffix when does not have suffix', async ({ assert }) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug');
	assert.equal(mySlugWithouSuffix, 'new-slug-1');
});
