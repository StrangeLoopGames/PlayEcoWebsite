import meteor from '../assets/images/eco-world-meteor.png';
export function NotFound () {
    // add not-found to the body class
    document.body.classList.add('not-found');
    return (
        <section id="404-notfound" className="d-flex col-lg-offset-2 col-lg-8 justify-content-center">
        <div className="col-md-12 notes-wrapper">
            <article className="col-md-12">
                <div className="btn-big-wrapper" style={{ textAlign: 'center', margin: '0 auto 100px' }}>
                    <img 
                        className="img-transparent shakeX" 
                        style={{ width: 'auto', display: 'block', verticalAlign: 'text-top', margin: '0 auto' }} 
                        src={meteor} 
                        alt="Meteorite Impact"
                    />
                    <div style={{ display: 'inline-block', width: '70%', verticalAlign: 'text-top' }}>
                        <h1 style={{ fontSize: '44px' }}>404: Meteorite Impact!</h1>
                        <div style={{ width: '90%', textAlign: 'center', margin: '0 auto', fontSize: '25px', lineHeight: '33px' }}>
                            The page you are looking for does not exist. If you can't find what you're looking for, please contact our <a href="#" className="support-btn" onClick={() => {document.getElementById('contactFormModal').style.display = 'block'; return false;}}>support team</a>.
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
    )
}