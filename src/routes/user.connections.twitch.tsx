import { createFileRoute, redirect } from '@tanstack/react-router'
import ModalWrapper from '../components/ModalWrapper'
import { AuthenticatedUser, useUserQuery } from '../utils/authentication';

export const Route = createFileRoute('/user/connections/twitch')({
  component: () => {
    if (AuthenticatedUser()) {
      location.href = "https://id.twitch.tv/oauth2/authorize?client_id=ddyqfm84zm2a3dny5vv2yyypnbcj5p&redirect_uri=https://play.eco/account/twitch-callback&response_type=code&scope=user:read:email"
    } else {
      location.href = "/login"
    }
    return (
      <div>
        <ModalWrapper dismissable={false}>
          <>
            <h1>Redirecting to Twitch</h1>
            <p>We are redirecting you to twitch</p>
          </>
        </ModalWrapper>
      </div>
    )
  }
})