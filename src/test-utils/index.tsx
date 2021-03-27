import {render as defaultRender} from '@testing-library/react';
import {RouterContext} from 'next/dist/next-server/lib/router-context';
import {NextRouter} from 'next/router';

export * from '@testing-library/react';

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & {router?: Partial<NextRouter>};

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  isReady: true,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: true,
  isPreview: false,
};

export function render(
  ui: RenderUI,
  {wrapper, router, ...options}: RenderOptions = {},
) {
  if (!wrapper) {
    // eslint-disable-next-line no-param-reassign, react/display-name
    wrapper = ({children}) => (
      <RouterContext.Provider value={{...mockRouter, ...router}}>
        {children}
      </RouterContext.Provider>
    );
  }

  return defaultRender(ui, {wrapper, ...options});
}
