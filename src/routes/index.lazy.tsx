import { createLazyFileRoute } from '@tanstack/react-router'
import { Newletter } from '../components/Newsletter'
import "../assets/_landing.scss"
import logo from '../assets/images/eco-logo.png';
import steamicon from '../assets/images/steam.svg';
import { Trans } from "@lingui/macro";
// import eco-logo.png 
export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center'>
            <div className="sales landingpage">
                <section className="row darkmode">
                    <div className="col-md-12 first-section">
                        <article className="">
                            <div className="tree-clouds"></div>
                            <div className="tree-clouds-2"></div>
                            <a href="#tree" className="tree-pointer zoomin"></a>
                            <img className="zoomin hero-logo" src={logo} alt="" />

                            <h1 className="darkmode-title">Build a Civilization in a Simulated Ecosystem.</h1>
                            <h3 className="subtitle-big">Eco is an online game where players must collaborate to build a civilization in a world where everything they do affects the environment.</h3>
                            <div className="col-sm-10 col-sm-offset-1 col-md-12 col-md-offset-0 trailer-wrap">
                                <div className="col-md-6">
                                    <div className="image trailer-main">
                                        <div className="auto-resizable-iframe">
                                            <div>
                                            <iframe id="youtube" width="745" height="419" data-src="https://www.youtube.com/embed/d6zvBdUDMPY?autoplay=1&amp;mute=1&amp;loop=1&amp;rel=0&amp;modestbranding=1&amp;autohide=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="https://www.youtube.com/embed/d6zvBdUDMPY?autoplay=1&amp;mute=1&amp;loop=1&amp;rel=0&amp;modestbranding=1&amp;autohide=1"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className='trailer-title'>Create a virtual society</h4>
                                    <p> with your fellow Citizens, complete with a government, economy, and culture.
                                        Work together to achieve society level goals, transforming the natural world while working to live in harmony with it.
                                        Eco is an online multiplayer game where players must collaborate to survive global threats, without creating one of their own in the process.</p>
                                    <p><b>Current Status:</b> Eco is released in Early Access and available for purchase.</p>"
                                </div>
                            </div>
                            <div className="landing-banner">
                                <div className="social col-md-6">
                                    <Newletter />
                                </div>
                                <div className="col-md-6 purchase-wrap d-flex flex-row">
                                    <a href="/buy" className="btn btn col-md-6 justify-content-between fs-6 buyweb"><img
                                        className="steam-icon" src={steamicon} />lang.home_buyweb</a>
                                    <a href="https://store.steampowered.com/app/382310/Eco/" target="_blank"
                                        className="btn btn col-md-6 justify-content-between fs-6">
                                        <img className="steam-icon" src={steamicon} /> lang.home_buysteam </a>
                                </div>
                                <div className="social social-links col-sm-10 col-sm-offset-1 col-md-12 col-md-offset-0">
                                    <div className="col-md-6">
                                        Socials Here
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="row darkmode">
                    <div className="col-md-12">
                        <article className="col-lg-offset-2 col-lg-8">
                            <div className="tree-clouds-3"></div>

                            <div className="fadeinscroll">
                                Awards Here
                            </div>
                        </article>
                    </div>
                </section>

                <section className="row darkmode hidden" id="news">
                    <div className="col-md-12">
                        <article className="col-lg-offset-2 col-lg-8">
                            <div className="tree-clouds-5"></div>
                            <div className="fadeinscroll">
                                <h1 className="title-margin-bottom darkmode-title">Recent Events in Eco's&nbsp;Development</h1>
                                <div className="row news-wrapper"></div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </ section>
    )
}