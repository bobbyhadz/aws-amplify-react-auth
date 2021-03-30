import Auth from '@aws-amplify/auth';
import {useAuth} from '@context/auth';
import {useRouter} from 'next/router';

export function useLogout() {
  const {dispatch} = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      await Auth.signOut();

      dispatch({type: 'LOGOUT_SUCCESS'});
      localStorage.clear();

      router.push('/');
    } catch (err) {
      localStorage.clear();
    }
  }

  return handleLogout;
}
