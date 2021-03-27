import {render, screen} from '@test-utils/index';
import PageNotFound from './404.page';

describe('<PageNotFound />', () => {
  it('renders the about page', () => {
    expect.assertions(1);
    render(<PageNotFound />);

    expect(screen.getByText(/couldn't find this page/i)).toBeInTheDocument();
  });
});
