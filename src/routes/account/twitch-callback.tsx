import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedUser } from '../../utils/authentication';
import ModalWrapper from '../../components/ModalWrapper';

export const Route = createFileRoute('/account/twitch-callback')({
  beforeLoad: async ({ location }) => {
    const userJwt = AuthenticatedUser();
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (!AuthenticatedUser()) {
      throw redirect({
        to: '/login',
        search: {
          error: 'authentication_error',
          redirect: location.href,
        },
      });
    }
    if (code) {
      const response = await fetch(`${import.meta.env.VITE_CLOUD_API_URL}UserAccount/TwitchCallback?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userJwt}`
        },
      });

      if (!response.ok) {
        throw redirect({
          to: '/account',
          search: {
            error: 'twitch_callback_error',
          },
        });
      } else {
        throw redirect({
          to: '/account',
          search: {
            error: null,
          },
        });
      }
    } else {
      throw redirect({
        to: '/account',
        search: {
          error: 'twitch_callback_error',
        },
      });
    }
  },
  component: () => {
    return (
      <div>
        <ModalWrapper dismissable={false}>
          <>
            <h1>Processing your request...</h1>
            <p>Please wait while we link your Twitch account to your Eco account.</p>
          </>
        </ModalWrapper>
      </div>
    )
  }
});