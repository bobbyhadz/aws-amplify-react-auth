import {
  FRONTEND_BASE_URL,
  GITHUB_HANDLE,
  IMAGE_PATHS,
  TWITTER_HANDLE,
} from './constants';

const title = 'Next.js implements cognito Auth managed by CDK';
const description =
  'Web developer interested in React, Next, AWS and Serverless.';

const SEO = {
  title,
  titleTemplate: '%s - Bobby Hadz',
  description,
  canonical: FRONTEND_BASE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: FRONTEND_BASE_URL,
    title,
    description,
    images: [
      {
        url: `${FRONTEND_BASE_URL}${IMAGE_PATHS.OPEN_GRAPH}`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: `@${TWITTER_HANDLE}`,
    site: `@${GITHUB_HANDLE}`,
    cardType: 'summary_large_image',
  },
};

export default SEO;
