import {Component} from 'react';

export class TopLevelErrorBoundary extends Component<
  Record<string, unknown>,
  {hasError: boolean}
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: unknown) {
    console.log('GetDerivedStateFromError:', error);

    return {hasError: true};
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection);
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log('Unexpected error occurred!', error, errorInfo);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
  }

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch(error => {
      this.setState(TopLevelErrorBoundary.getDerivedStateFromError(error));
    });
  };

  render() {
    const {hasError} = this.state;
    const {children} = this.props;

    if (hasError) {
      return (
        <h1 className="text-2xl">
          An error has occurred
          <span role="img" aria-label="cross">
            ❌️❌️❌️
          </span>
        </h1>
      );
    }

    return children;
  }
}
