import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedUser, useIsUserAdmin } from '../utils/authentication';
import { UserEditor } from '../components/admin/UserEditor';
import "../assets/admin.scss";
import { AdminMenu } from '../components/admin/AdminMenu';
type AdminParams = {
  editor: string;
}

function RenderEditor(props: {editor: string}) {
  const {editor} = props;
  if (editor == "user") {
    return <UserEditor />
  } else {
    return <UserEditor />
  }
}
export const Route = createFileRoute('/admin')({
  validateSearch: (search: Record<string, unknown>): AdminParams => {
    return { editor: search.editor as string };
  },
  component: () => {
    const {editor} = Route.useSearch();
    document.title = 'Eco - Admin';   
    if (!AuthenticatedUser() && useIsUserAdmin(AuthenticatedUser() as string)) {
      window.location.href = '/account';
    } else {
      return (
      <section className='col-lg-offset-2 col-lg-8' id="account">
        <div className="account-feature">
        <AdminMenu />
              <RenderEditor editor={editor} />
        </div>
      </section>
      )
    } 
  }
})
