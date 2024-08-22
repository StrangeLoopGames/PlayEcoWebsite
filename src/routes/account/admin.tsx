import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedUser, useIsUserAdmin } from '../../utils/authentication';
import { UserEditor } from '../../components/admin/UserEditor';
import "../../assets/admin.scss";

export const Route = createFileRoute('/account/admin')({
  // beforeLoad: async ({ location }) => {

  // },
  component: () => {
    document.title = 'Eco - Admin';   
    // hide header
    document.querySelector('header')?.classList.add('d-none');
    return (
      <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-12 justify-content-center' id="account">
      <div className="col-12 p-3">
      <UserEditor />
      </div>
    </section>
    )
  }
})
