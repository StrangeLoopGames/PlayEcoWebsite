import { createLazyFileRoute, redirect } from '@tanstack/react-router'
import ModalWrapper from '../components/ModalWrapper';
import { AuthenticatedUser } from '../utils/authentication';

export const Route = createLazyFileRoute('/redeem')({

  component: () => {
    return (
      <div>
        <ModalWrapper dismissable={false}>
          <>
            <h1>Please Wait</h1>
            <p>We are redirecting you to your account</p>
          </>
        </ModalWrapper>
      </div>
    )
  }

})