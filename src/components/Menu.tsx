import { Link } from "@tanstack/react-router";
interface MenuItems {
    [key: string]: string;
}
const menuItems: MenuItems = {
    'Cloud Hosting': '/cloudhosting',
    Jobs: '/jobs',
    Contact: '/contact',
    Account: '/account',

}
function Menu() {
    return (
        <>
            <nav className="d-flex flex-row">
                {
                    Object.keys(menuItems).map((item) => (
                        <Link key={item} to={menuItems[item]} className="mx-1">{item}</Link>
                    ))
                }
            </nav>
        </>
    )
}
export default Menu;