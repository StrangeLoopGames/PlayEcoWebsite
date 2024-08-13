import { createLazyFileRoute } from '@tanstack/react-router'
import "../../assets/_twitch.scss";
export const Route = createLazyFileRoute('/twitch/')({
  component: () => {
    return (
      <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="buy">
        <div className="col-md-12">
          <div className="drops-campaign">
            <div className="tree-clouds"></div>
            <section className="row">
              <div className="col-md-6">
                <div className="row drops-heading text-right">
                  <h1 className="text-right">ECO 11 launch</h1>
                  <h2 className="text-right">Twitch Drops</h2>
                  <p className="text-right">Twitch Drops to celebrate the 10.0 launch we've got a selection of nautical themed drops to celebrate the addition of boats!</p>
                  <a href="/account" className="btn btn account-link">
                    <img className="twitch-icon img-transparent" src="/images/twitch/twitch.svg" />Link Twitch Account</a>
                  <p className="account-info text-right">If you purchased the game through Steam, you will also need to link your Steam account to a play.eco account.</p>
                </div>
              </div>
              <div className="col-md-6">
                <img src="/images/twitch/polaroid.png" className="polaroid center-block img-transparent zoomin" alt="Responsive image" />
              </div>
            </section>
            <section id="drop-rewards" className="row">
              <div className="col-md-12">
                <h3 className="drops-campaign-heading text-center">Twitch Drops</h3>
                <p className="reward-title text-center">12 December 2023 - 4 January 2024</p>
                <div className="row rewards">
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/FlipFlops.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Boat Captain Flip Flops</p>
                    <span className="reward-time">30 mins</span>
                  </div>
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/CaptainGlasses.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Boat Captain Glasses</p>
                    <span className="reward-time">1 hour </span>
                  </div>
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/CaptainHat.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Boat Captain Hat</p>
                    <span className="reward-time">1 hour 30 mins</span>
                  </div>
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/CaptainShirt.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Captain Shirt</p>
                    <span className="reward-time">2 hours</span>
                  </div>
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/CaptainShorts.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Boat Captain Shorts</p>
                    <span className="reward-time">2 hours 30 mins</span>
                  </div>
                  <div className="col-md-4 col-xs-12 reward">
                    <img src="/images/twitch/SharkJaws.png" className="reward-icon center-block img-transparent zoomin" alt="Responsive image" />
                    <p className="reward-title">Shark Jaws</p>
                    <span className="reward-time">3 hours </span>
                  </div>
                </div>
              </div>
            </section>
            <section id="drop-rewards" className="row">
              <div className="col-md-12">
                <h3 className="drops-campaign-heading text-center">how it works</h3>
                <div className="col-md-12">
                  <div className="faq-description">
                    <span id="#link-account" className="faq-title">Link Twitch account</span>
                    <p className="faq-text">To participate in the drops campaign you must link your Twitch account to your play.eco account. If you purchased the game through Steam, you will also need to link your Steam account to a play.eco account.</p>
                    <span className="faq-title">How do I earn the rewards</span>
                    <p className="faq-text">In order to recieve the rewards, you must watch any ECO streams for the required amount of time in channels that have <a href="https://www.twitch.tv/directory/category/eco?filter=drops" target="_blank">drops enabled</a>.</p>
                    <span className="faq-title">How do I enable drops for my stream</span>
                    <p className="faq-text">To enable drops on your channel you need to make sure you have the ECO drop campaign enabled on your <a href="https://dashboard.twitch.tv/drops" target="_blank">drops dashboard</a>.</p>
                    <span className="faq-title">How do I track my progress</span>
                    <p className="faq-text">You can check your progress for each drop by going to your <a href="https://www.twitch.tv/drops/inventory" target="_blank">Twitch inventory</a>.</p>
                    <span className="faq-title">Where do I find my drops</span>
                    <p className="faq-text"><img className="void-storage-icon img-transparent" src="/images/slg_logo.png" /> You can find your drops by opening your void storage (spinning Strange Loop Games Logo) at the bottom of your screen when you are in game.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    )
  }
})