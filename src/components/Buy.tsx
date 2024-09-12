import { Link, redirect } from "@tanstack/react-router";
import "../assets/_buy.scss";
import { splitCamelCaseAndCapitalize } from "../utils/stringUtils";
import { AuthenticatedUser, useUserQuery } from "../utils/authentication";
import ModalWrapper from "../components/ModalWrapper";
import Payments from "./account/Payments";
import { useState } from "react";
import { marketItem } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteamSquare } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "./Carousel ";

export function Buy() {
    const userJWT = (AuthenticatedUser()) ? AuthenticatedUser() : '';
    const { data: user, error: userError, isLoading } = useUserQuery(userJWT as string, false);
    const [purchase, setPurchase] = useState<marketItem | null>(null)
    const marketItems: marketItem[] = [
        {
            id: "EcoCredits500",
            sku: "EcoCredits1",
            name: "500 Credits",
            description: null,
            price: 5.00,
        },
        {
            id: "EcoCredits1000",
            sku: "EcoCredits2",
            name: "1000 Credits",
            description: null,
            price: 10.00,
        },
        {
            id: "EcoCredits2800",
            sku: "EcoCredits3",
            name: "2800 Credits",
            description: "2500 + 300 FREE",
            price: 25.00,
        },
        {
            id: "EcoCredits5700",
            sku: "EcoCredits4",
            name: "5700 Credits",
            description: "5000 + 700 FREE",
            price: 50.00,
        },
        {
            id: "EcoCredits11500",
            sku: "EcoCredits5",
            name: "11500 Credits",
            description: "10000 + 1500 FREE",
            price: 100.00,
        },
        {
            id: "EcoCredits18500",
            sku: "EcoCredits6",
            name: "18500 Credits",
            description: "15000 + 3500 FREE",
            price: 150.00,
        },
    ];
    const gamePurchase: marketItem = {
        id: "game_purchase",
        name: "Eco",
        description: null,
        sku: "game_eco_purchase",
        price: 30.00,
    }
    const toggleModal = () => {
        console.log('toggleModal');

        setPurchase(null);
    };
    function handlelePurchaseInit(item: marketItem) {
        setPurchase(null);
        if (!AuthenticatedUser()) {
            location.href = `/login?redirect=${location.href}&error=purchase_login`;
        } else {
            if (item.sku == "game_eco_purchase") {
                user && user.ownsEco ? setPurchase(null) : setPurchase(item);
            } else {
                setPurchase(item);
            }
        }
    }
    const screenshots = [
        "screenshot_1.jpg",
        "screenshot_2.jpg",
        "screenshot_3.jpg",
        "screenshot_4.jpg",
        "screenshot_5.jpg",
        "screenshot_6.jpg",
        "screenshot_7.jpg",
        "screenshot_8.jpg",
        "screenshot_9.jpg",
        "screenshot_10.jpg",
        "screenshot_11.jpg",
    ]
    const urlParams = new URLSearchParams(window.location.search);
    const hasTrackingId = urlParams.has('tracking_id');
    return (
        <>
            <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="buy">
                <div className="col-md-12">
                    <h1 className="mb-4">Purchase Eco</h1>
                    <div className="d-flex gap-2 py-4">
                        <div className="col-md-7">
                            <div className="image trailer-main">
                                <div className="auto-resizable-iframe">
                                    <div>
                                        <iframe id="youtube" width="745" height="419" data-src="https://www.youtube.com/embed/d6zvBdUDMPY?autoplay=1&amp;mute=1&amp;loop=1&amp;rel=0&amp;modestbranding=1&amp;autohide=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="https://www.youtube.com/embed/d6zvBdUDMPY?autoplay=1&amp;mute=1&amp;loop=1&amp;rel=0&amp;modestbranding=1&amp;autohide=1"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 px-2">
                            <h2 className='text-left'>Create a virtual society</h2>
                            <p className="fs-3">Build a civilization of real people, working together to advance society and stop a meteor, all without destroying the ecosystem in the process.</p>
                            <div className="d-flex flex-column gap-2">
                                <button onClick={() => handlelePurchaseInit(gamePurchase)} className="btn justify-content-between fs-4 purchase-cta position-relative">
                                    <span>
                                        <span className="icon-wrap"><FontAwesomeIcon className="icon download-icon icon" icon={faCartShopping} /></span>
                                        {user && user.ownsEco ? "You already Own Eco" : "Buy Eco directly + unlock on Steam"}
                                    </span>
                                </button>
                                {!hasTrackingId && (
                                    <a href="https://store.steampowered.com/app/382310/Eco/" target="_blank"
                                        className="btn justify-content-between fs-4 purchase-cta position-relative">
                                        <span>
                                            <span className="icon-wrap"><FontAwesomeIcon className="icon download-icon icon" icon={faSteamSquare} /></span>
                                            Buy Eco on Steam.
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-2 py-4">
                    <div className="col-md-12"> 
                    <h4 className="py-2 fw-bold">Screenshots</h4>
                        <Carousel images={screenshots} slidesPer={3} />
                    </div>
                    <div className="col-md-6"> 
                    </div>
                    </div>
                    <h4 className="pt-5 fw-bold">Eco Credits</h4>
                    <p className="pt-3 fs-3">Buy Eco Credits here and spend them on premium variants inside the game!</p>
                    <div id="marketplace" className="d-flex mt-4 gap-0 flex-wrap justify-content-between">
                        {
                            marketItems.map((item, index) => {
                                return (
                                    <div className="buy-credits d-flex flex-column p-1 zoomin" key={index} >
                                        <div className="card market-item" onClick={() => handlelePurchaseInit(item)} style={{ backgroundImage: `url(images/buy/${item.id}.jpg)` }}>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div className="title-wrap">
                                                    <h3 className="card-title">{splitCamelCaseAndCapitalize(item.name)}</h3>
                                                    {
                                                        item.description ? (
                                                            <h3 className="card-title subtitle">{item.description}</h3>
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="buy-wrap d-flex flex-column align-items-center">
                                                    <p className="item-price">${item.price.toFixed(2)}</p>
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
                                        <li><strong>Storage: </strong> 6 GB available space</li>
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
                                        <li><strong>Storage: </strong> 10 GB available space</li>
                                        <li><strong>Sound Card: </strong> DirectX®-compatible</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            {
                purchase != null ? (
                    <ModalWrapper toggleModal={toggleModal} dismissable={true}>
                        <Payments item={purchase} />
                    </ModalWrapper>
                ) : null
            }
        </>
    )
}