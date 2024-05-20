import { Link } from "@tanstack/react-router"

const menuItems = {
    "User Editor": 'user',

}
export function AdminMenu() {
    return (
        <>
            <div className="d-flex flex-row">
                Admin Menu:
                {
                    Object.keys(menuItems).map((item) => (
                        <Link key={item} to={`?editor=${menuItems[item]}`} className="mx-1">{item}</Link>
                    ))
                }
            </div>
        </>
    )
}