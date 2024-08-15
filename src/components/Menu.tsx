import { Link } from "@tanstack/react-router";
import {menuItems} from "../data/menu";
import { AuthenticatedUser } from "../utils/authentication";

function Menu() {
    const isLoggedIn = !AuthenticatedUser();
    const lightMenu = ["/", "/twitch"].includes(window.location.pathname);
    
    return (
        <>
            <nav className={`d-flex flex-row ${lightMenu ? "light-menu" : ""}`}>
                {
                    Object.keys(menuItems).map((item) => (
                        // if doesn't start with / then it's an external link
                        <Link id={`menu-${item}`} key={item} to={menuItems[item]} className="mx-1" target={(menuItems[item].startsWith('/')) ? "" : "_blank"}>{item}</Link>
                    ))
                }
                <Link id="menu-login" to={isLoggedIn ? "/login" : "/account"} className="mx-1">{isLoggedIn ? "Login" : "Account"}</Link>
            </nav>
        </>
    )
}
export default Menu;