import "../assets/_buy.scss";
import { splitCamelCaseAndCapitalize } from "../utils/stringUtils";
export function Buy() {

    const marketItems = [
        {
            id: "EcoCredits10",
            name: "Eco Credits 10",
            price: 5.00,
        },
        {
            id: "EcoCredits25",
            name: "Eco Credits 25",
            price: 12.50,
        },
        {
            id: "EcoCredits50",
            name: "Eco Credits 50",
            price: 25.00,
        },
        {
            id: "EcoCredits100",
            name: "Eco Credits 100",
            price: 50.00,
        },
        {
            id: "EcoCredits250",
            name: "Eco Credits 250",
            price: 125.00,
        },
    ];
    return (
        <>
            <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="buy">
                <div className="col-md-12">
                    <h1 className="mb-4">Purchase Eco</h1>
                    <div className="buy-wrap d-flex flex-row game-banner overflow-hidden">
                        <div className="game-purchase col-6 d-flex flex-column text-white fw-bold p-2">
                            <div className="purchase-option d-flex flex-column justify-content-end">
                                <p className="info">Buy Eco from our store + get a key to unlock on Steam (best way to support us)</p>
                                <a href="/buy" className="btn btn-primary market-btn">Buy Eco Directly</a>
                            </div>
                        </div>
                        <div className="game-purchase col-6 d-flex flex-column text-white fw-bold p-2">
                            <div className="purchase-option d-flex flex-column justify-content-end">
                            <p className="info">Buy Eco on Steam and start playing today.</p>
                                <a href="https://store.steampowered.com/app/382310/Eco/" target="_blank" className="btn btn-primary market-btn">Buy Eco on Steam</a>
                            </div>
                        </div>

                    </div>
                    <h4 className="pt-5 fw-bold">Eco Credits</h4>
                    <p className="pt-3 fs-3">Buy Eco Credits here and spend them on premium variants inside the game!</p> 
                    <div id="marketplace" className="d-flex mt-4 gap-0 flex-wrap justify-content-between">
                    {
                    marketItems.map((item, index) => {
                        return (
                        <div className="buy-credits d-flex flex-column p-1 zoomin" key={index} >
                            <div className="card market-item" style={{backgroundImage: `url(images/buy/${item.id}.jpg)`}}>    
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h3 className="card-title">{splitCamelCaseAndCapitalize(item.name)}</h3>
                                <div className="buy-wrap d-flex flex-column align-items-center">
                                    <p className="item-price">${item.price}</p>
                                    <a href="/buy" className="btn btn-primary market-btn w-100">Buy</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        );
                    })
                    }
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