import {LoadingGlobal} from '@components/loading-spinner';
import {useAuth} from '@context/auth';
import {NextComponentType} from 'next';
import {useRouter} from 'next/router';
import {ComponentPropsWithRef, ReactNode} from 'react';
import {ROUTE_PATHS} from 'src/constants';

export const withAuthentication = (WrapperComponent: NextComponentType) => {
  const AuthCheck = (
    props: ComponentPropsWithRef<NextComponentType> & {children?: ReactNode},
  ) => {
    const {
      state: {isAuthenticated, isAuthenticating},
    } = useAuth();
    const router = useRouter();

    if (isAuthenticating) {
      return <LoadingGlobal />;
    }

    if (!isAuthenticated) {
      router.push(ROUTE_PATHS.LOGIN);
      return null;
    }

    return <WrapperComponent {...props} />;
  };

  AuthCheck.displayName = WrapperComponent.displayName;
  return AuthCheck;
};

export const withAnonymous = (WrapperComponent: NextComponentType) => {
  const AnonymousCheck = (
    props: ComponentPropsWithRef<NextComponentType> & {children: ReactNode},
  ) => {
    const {
      state: {isAuthenticated, isAuthenticating},
    } = useAuth();
    const router = useRouter();

    if (isAuthenticating) {
      return <LoadingGlobal />;
    }

    if (isAuthenticated) {
      router.push('/');
      return null;
    }

    return <WrapperComponent {...props} />;
  };

  AnonymousCheck.displayName = WrapperComponent.displayName;
  return AnonymousCheck;
};
