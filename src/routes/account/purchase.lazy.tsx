import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedUser } from '../../utils/authentication'
import Payments from '../../components/account/Payments';

export const Route = createFileRoute('/account/purchase')({
  beforeLoad: async ({ location }) => {
    if (!AuthenticatedUser()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => {
    document.title = 'Eco - Purchase';
    return (
      <section className='page-wrap-main col-lg-offset-2 col-lg-8' id="account">
      <div id="userDetails" className="account-feature">
        <Payments />
      </div>
      </section>
    )
  }
})