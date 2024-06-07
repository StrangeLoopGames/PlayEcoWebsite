import "../assets/_buy.scss";
const  placeholderProduct = "https://images.placeholders.dev/?width=300&height=200&bgColor=rgb(70,%20136,%20192)";
export function Buy() {
    return (
        <>
            <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="buy">
                <div className="col-md-12">
                    <h1 className="mb-4">Purchase Eco</h1>
                    <div className="buy-wrap d-flex flex-row">
                        <div className="col-4">
                            <img src="https://images.placeholders.dev/?width=600&height=500" alt="" />
                        </div>
                        <div className="col-8">
                            <ul className="d-flex flex-column gap-3">
                                <li>
                                <h2>Buy Eco Directly<sup>*best way to support us</sup></h2>
                                <p>Buy Eco from our store, and start playing today. You can also buy a gift code for a friend.</p>
                                <a href="/buy" className="btn btn-primary">Buy Eco</a>
                                </li>
                                <li>
                                <h2>Buy Eco on steam</h2>
                                <p>Buy Eco on Steam and start playing today.</p>
                                <a href="https://store.steampowered.com/app/382310/Eco/" target="_blank" className="btn btn-primary">Buy on Steam</a>
                                </li>   
                            </ul>
                        </div>

                    </div>
                    <div className="buy-credits d-flex flex-row gap-4 mt-5">
                        <div className="card col-4">
                        <img src={placeholderProduct} className="card-img-top" alt="credits" />
                            <div className="card-body">
                                <h3 className="card-title">Eco Credits 100</h3>
                                <p className="card-text">Eco is an online game where players must collaborate to build a civilization in a world where everything they do affects the environment..</p>
                            </div>
                        </div>
                        <div className="card col-4">
                        <img src={placeholderProduct} className="card-img-top" alt="credits" />
                            <div className="card-body">
                                <h3 className="card-title">Eco Credits 500</h3>
                                <p className="card-text">Eco is an online game where players must collaborate to build a civilization in a world where everything they do affects the environment. All resources come from a simulated ecosystem, with thousands of plants and animals simulating 24/7.</p>
                            </div>
                        </div>
                        <div className="card col-4">
                        <img src={placeholderProduct} className="card-img-top" alt="credits" />
                            <div className="card-body">
                                <h3 className="card-title">Eco Credits 1000</h3>
                                <p className="card-text">Eco is an online game where players must collaborate to build a civilization in a world where everything they do affects the environment. All resources come from a simulated ecosystem, with thousands of plants and animals simulating 24/7.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="requirements" className="row bg-d-stripes mt-5">
                <div className="col-md-12 d-flex justify-content-center">
                    <article className="col-lg-offset-2 col-lg-8">
                        <div className="account-feature-wrapper system-requirements-wrapper">
                            <h2 className="account-title">System Requirements</h2>
                            <div>
                                <div className="system-requirements-subwrappers">
                                    <strong>Minimum:</strong>
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>Requires a 64-bit processor and operating system</li>
                                        <li><strong>OS: </strong>Windows 10 64-Bit or newer</li>
                                        <li><strong>Processor: </strong>AMD Ryzen 5 1500X 3.5 GHz Quad-Core or Intel i5-6500 3.2 GHz Quad-Core or similar</li>
                                        <li><strong>Memory: </strong>8 GB RAM</li>
                                        <li><strong>Graphics: </strong>AMD Radeon R9 290 or NVIDIA GTX 970 or similar (Minimum: 4 GB VRAM)</li>
                                        <li><strong>DirectX: </strong>Version 11</li>
                                        <li><strong>Network: </strong> Broadband Internet connection</li>
                                        <li><strong>Storage: </strong> 4 GB available space</li>
                                        <li><strong>Sound Card: </strong> DirectX®-compatible</li>
                                    </ul>
                                </div>
                                <div className="system-requirements-subwrappers">
                                    <strong>Recommended:</strong>
                                    <ul style={{ listStyleType: "disc" }}>
                                        <li>Requires a 64-bit processor and operating system</li>
                                        <li><strong>OS: </strong>Windows 10 64-Bit or newer</li>
                                        <li><strong>Processor: </strong>AMD Ryzen 7 3700X 3.6 GHz Eight-Core or Intel Core i7 9700K 3.6 GHz Eight-Core or similar</li>
                                        <li><strong>Memory: </strong>16 GB RAM</li>
                                        <li><strong>Graphics: </strong>AMD Radeon RX 5700 or NVIDIA GeForce RTX 2070 or similar (Recommended: 8 GB VRAM)</li>
                                        <li><strong>DirectX: </strong>Version 11</li>
                                        <li><strong>Network: </strong> Broadband Internet connection</li>
                                        <li><strong>Storage: </strong> 8 GB available space</li>
                                        <li><strong>Sound Card: </strong> DirectX®-compatible</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}