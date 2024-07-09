import Menu from '../components/Menu';
import logo from '../assets/images/eco-logo.png';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const router = useRouterState();
    const isAdmin = router.location.pathname.includes('/admin');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {
                !isAdmin && !router.isTransitioning ? (
                    <header className={`w-100 d-flex flex-row justify-content-between px-3 p-1 align-items-center ${isSticky ? "hdr-sticky" : ""}`}>
                        <div className="col-xs-3">
                            <a href="/" className="header-logo"><img src={logo} alt="" className='eco-logo' /></a>
                            <span className="breadcrumbs">Cloud Hosting</span>
                        </div>
                        <Menu />
                    </header>
                ) : null
            }
        </>
    )
}
export default Header;