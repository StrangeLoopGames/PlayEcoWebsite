import { Link, redirect } from "@tanstack/react-router";
import "../assets/_buy.scss";
import { splitCamelCaseAndCapitalize } from "../utils/stringUtils";
import { AuthenticatedUser, useUserQuery } from "../utils/authentication";
import ModalWrapper from "./ModalWrapper";
import Payments from "./account/Payments";
import { useState } from "react";
import { marketItem } from "../types/types";

export function Hosting() {
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
    return (
        <>
            <section className='page-wrap-main d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="hosting">
                <div className="col-md-12">
                    <h1 className="mb-4">Hosting</h1>  
                    <div className="buy-wrap d-flex flex-row overflow-hidden">
                        <div className="col-5 d-flex flex-column text-white fw-bold p-2 zoomin">
                        <img className="zoomin" src="/images/cloudworlds/BeachCraneScene_5K.jpg" />
                        </div>
                        <div className="col-7 d-flex flex-column fw-bold p-2 text-dark">
                            <h4 className="fw-bold fs-4">You can use Eco Credits to buy hosting with our exclusive partner 4Players.IO!</h4>
                            <p className="pt-3 fs-4 fw-normal">
                            Eco server hosts collect a cut of every transaction that happens inside their world, and they can use these credits to buy hosting time.  
                            In this way a community can be funded by its own economic activity. 
                            </p>
                            <p className=""><Link to={"/buy"}>Eco Invites</Link>, giving a copy of the game, can also be purchased using Eco Credits.</p>
                            <h4>Coming soon!</h4>
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