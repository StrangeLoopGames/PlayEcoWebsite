import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import '../assets/App.scss'
import '../assets/style.scss'
import Header from '../components/Header'
export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            <div className="content-wrap">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    ),
})