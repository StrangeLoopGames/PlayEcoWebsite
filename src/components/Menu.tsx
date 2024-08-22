import { Link } from "@tanstack/react-router";
import { menuItems } from "../data/menu";
import { AuthenticatedUser } from "../utils/authentication";

function Menu() {
    const isLoggedIn = !AuthenticatedUser();
    const lightMenu = ["/", "/twitch"].includes(window.location.pathname);

    return (
        <>
            <nav className={`d-flex flex-row ${lightMenu ? "light-menu" : ""}`}>
                {
                    Object.keys(menuItems).map((item) => (
                        menuItems[item].startsWith('/') ? (
                            <Link id={`menu-${item}`} key={item} to={menuItems[item]} className="mx-1">{item}</Link>
                        ) : (
                            <a id={`menu-${item}`} key={item} href={menuItems[item]} className="mx-1" target="_blank" rel="noopener noreferrer">{item}</a>
                        )
                    ))
                }
                <Link id="menu-login" to={isLoggedIn ? "/login" : "/account"} className="mx-1">{isLoggedIn ? "Login" : "Account"}</Link>
            </nav>
        </>
    );
}

export default Menu;