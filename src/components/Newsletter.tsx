export function Newletter() {
    return (
        <>
            <div className="newsletter">
                <form method="post" action="/Account/subscribe" id="subscribeForm" className="validate" novalidate="">
                    <input type="email" value="" id="subscribeemail" name="email" className="form-control" placeholder="Enter Email" />
                        <input type="hidden" name="ml-submit" value="1" />
                            <input type="submit" value="Get Updates" name="subscribe" className="btn" />
                            </form>
                        </div>
                    </>
                    )
}