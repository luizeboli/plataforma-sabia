import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, description, url, ogImage }) => (
	<NextHead>
		<meta charSet="UTF-8" />
		<title>{title}</title>
		<meta name="description" content={description} />
		<meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
		<link rel="icon" sizes="192x192" href="/static/touch-icon.png" key="touch-icon" />
		<link rel="apple-touch-icon" href="/static/apple-touch-icon.png" key="apple-touch-icon" />
		<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" key="mask-icon" />
		<link rel="icon" href="/static/favicon.ico" key="favicon.ico" />
		<meta property="og:url" content={url} key="og:url" />
		<meta property="og:title" content={title || ''} key="og:title" />
		<meta property="og:description" content={description} key="og:description" />
		<meta name="twitter:site" content={url} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={ogImage} />
		<meta property="og:image" content={ogImage} key="og:image" />
		<meta property="og:image:width" content="1200" key="og:image:width" />
		<meta property="og:image:height" content="630" key="og:image:height" />
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlQrq14K2OTjUxioB4fW7NJTzZQ2ZFtxA&libraries=places" />
	</NextHead>
);

Head.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	url: PropTypes.string,
	ogImage: PropTypes.string,
};

Head.defaultProps = {
	title: '',
	description: '',
	url: '',
	ogImage: '',
};

export default Head;
