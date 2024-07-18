import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import '../assets/App.scss'
import '../assets/style.scss'
import Header from '../components/Header'
export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            {/* Append the route path to class to dynamicaly control background for accounts pages, removes / from front */}
            <div className={`content-wrap ${useRouterState().location.pathname.replace(/\//g, '')}`}>
                <Outlet />
            </div>
        </>
    ),
})