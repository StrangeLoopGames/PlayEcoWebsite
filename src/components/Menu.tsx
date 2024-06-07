import { Link } from "@tanstack/react-router";
import {menuItems} from "../data/menu";
function Menu() {
    return (
        <>
            <nav className="d-flex flex-row">
                {
                    Object.keys(menuItems).map((item) => (
                        // if doesn't start with / then it's an external link
                        <Link key={item} to={menuItems[item]} className="mx-1" target={(menuItems[item].startsWith('/')) ? "" : "_blank"}>{item}</Link>
                    ))
                }
            </nav>
        </>
    )
}
export default Menu;