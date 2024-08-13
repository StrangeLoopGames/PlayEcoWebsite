import { createLazyFileRoute } from '@tanstack/react-router'
import { Newletter } from '../components/Newsletter'
import "../assets/_landing.scss"
import logo from '../assets/images/eco-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faSteamSquare, faFacebookSquare, faXTwitter, faDiscord, faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { Trans } from "@lingui/macro";
// import eco-logo.png 
export const Route = createLazyFileRoute('/')({
    component: Index,
    notFoundComponent: () => {
        return <p>This setting page doesn't exist!</p>
    },
})
document.body.classList.add('home');
function Index() {
    return (
        <>
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
                                        <p><b>Current Status:</b> Eco is released in Early Access and available for purchase.</p>
                                    </div>
                                </div>
                                <div className="landing-banner">
                                    <div className="social col-md-6">
                                        <Newletter />
                                        <div className="socials w-100 justify-content-center d-flex gap-3 py-4">
                                            <a href="https://www.facebook.com/EcoVideoGame" target="_blank"><FontAwesomeIcon className="facebook-icon fs-1" icon={faFacebookSquare} /></a>
                                            <a href="https://twitter.com/StrangeLoopGame" target="_blank"><FontAwesomeIcon className="XTwitter-icon fs-1" icon={faXTwitter} /></a>
                                            <a href="https://twitch.tv/strangeloopgames" target="_blank"><FontAwesomeIcon className="Discord-icon fs-1" icon={faTwitch} /></a>
                                            <a href="https://www.youtube.com/user/StrangeLoopGame" target="_blank"><FontAwesomeIcon className="Youtube-icon fs-1" icon={faYoutube} /></a>
                                            <a href="https://discord.gg/eco" target="_blank"><FontAwesomeIcon className="Discord-icon fs-1" icon={faDiscord} /></a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 purchase-wrap d-flex flex-row">
                                        <a href="/buy" className="btn btn col-6 justify-content-between fs-4 buyweb purchase-cta">
                                            <span><FontAwesomeIcon className="icon download-icon" icon={faCartShopping} /> Buy Direct</span></a>
                                        <a href="https://store.steampowered.com/app/382310/Eco/" target="_blank"
                                            className="btn btn col-6 justify-content-between fs-4 purchase-cta">
                                            <span><FontAwesomeIcon className="icon download-icon icon" icon={faSteamSquare} /> Buy on Steam</span> </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
            </section>
            <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center'>
                <div className="col-md-12">
                    <article className="col-md-12">
                        <div className="tree-clouds-3"></div>
                        <div className="fadeinscroll visible">
                            <h1 className="darkmode-title">Reviews</h1>
                            <div className="intro-awards-wrapper text-center mt-4 text-shadow">
                                <a href="https://venturebeat.com/2018/12/27/jeff-grubb-game-of-the-year-2018/" target="_blank" className="intro-awards-5">Game Of The Year</a>
                                <a href="https://www.kickstarter.com/projects/1037798999/eco-global-survival-game" target="_blank" className="intro-awards-4">Successful Kickstarter</a>
                            </div>
                            <div className="quote-wrap d-flex flex-row flex-wrap text-shadow">
                                <div className="col-md-5 col-12 p-2">
                                    <p className="testimonial-quote">
                                        <span className="srt-mark">“</span>
                                        The Mayor on our server created a law and organized players to make a last ditch effort to save our planet. We spent hours planting every seed we had collected over the past week and within a couple days, our planet was back to a living, breathing eco system. The animals came back, the ground turned green again and we learned from our mistakes. This game brings people together and teaches you a valuable lesson about life.
                                        <span className="end-mark">”</span>
                                    </p>
                                    <div className="testimonial-author">Myndphuck - 85 hours</div>
                                </div>
                                <div className="col-md-5 col-12 p-2">
                                    <a href="https://venturebeat.com/2018/12/27/jeff-grubb-game-of-the-year-2018/" target="_blank">
                                        <p className="testimonial-quote"><span className="srt-mark">“</span>Number 1 game of 2018...Eco is a revelation...it made me realize that games are actually crucial for understanding our relationship to all kinds of natural and man-made systems. The thing that gives me chills is that I think it is only in games that we can play with economic systems. And I walked away from my experience in Eco feeling like I learned so much even though we had no instructor. No one was connecting the dots for us. We simply learned through play.<span className="end-mark">”</span></p>
                                        <div className="testimonial-author">Jeff Grubb - Venture Beat</div>
                                    </a>
                                </div>
                                <div className="col-md-5 col-12 p-2">
                                    <p className="testimonial-quote"><span className="srt-mark">“</span>My Dream Game and the best gaming experience I have had in years.&nbsp; Kudos to the devs for creating a product that even in beta is ridiculously fun.<span className="end-mark">”</span></p>
                                    <div className="testimonial-author">Sir Spooki - 306 hours</div>
                                </div>
                                <div className="col-md-5 col-12 p-2">
                                    <p className="testimonial-quote"><span className="srt-mark">“</span>The only game that truly does cooperative properly” –Army Mom Strong, 995 hours<span className="end-mark">”</span></p>
                                    <div className="testimonial-author">Army Mom Strong - 995 hours</div>
                                </div>
                                <div className="col-md-5 col-12 p-2">
                                    <p className="testimonial-quote"><span className="srt-mark">“</span>This is by far the best ‘community’ type of game I have ever played. <span className="end-mark">”</span></p>
                                    <div className="testimonial-author">Steam user - 1598 hours</div>
                                </div>
                                <div className="col-md-5 col-12 p-2">
                                    <p className="testimonial-quote"><span className="srt-mark">“</span>7600 hours in and I’m still playing<span className="end-mark">”</span></p>
                                    <div className="testimonial-author">Elmeye - 7600 hours</div>
                                </div>
                            </div> </div>
                    </article>
                </div>
            </section>
        </>
    )
}