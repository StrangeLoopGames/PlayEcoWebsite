import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedUser, useIsUserAdmin } from '../utils/authentication';
import { UserEditor } from '../components/admin/UserEditor';
import "../assets/admin.scss";

export const Route = createFileRoute('/admin')({
  component: () => {
    document.title = 'Eco - Admin';   
    if (!AuthenticatedUser() && useIsUserAdmin(AuthenticatedUser() as string)) {
      window.location.href = '/account';
    } else {
      return (
        <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="account">
        <div className="col-12">
        <div className="account-feature">
        <UserEditor />
        </div>
        </div>
      </section>
      )
    } 
  }
})
