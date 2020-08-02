import React, {useEffect, useState} from 'react';
import {IonActionSheet, IonButton, IonIcon, IonItem, IonLabel, IonSlide} from "@ionic/react";
import {arrowForwardSharp, caretForward, closeSharp} from 'ionicons/icons';
import {calculateCoinFromPercentage, calculateSpecialCoinPrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";
import {numberWithCommas} from "../MetaDataUtils";

interface SlideProps {
    trans: boolean
    setTrans: (val: any) => void
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const SpecialCoinSlide: React.FC<SlideProps> = (props) => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [coinToBuy, setCoinToBuy] = useState(1)
    const [isPercentage, setIsPercentage] = useState(false);
    const [percentage, setPercentage] = useState(0.001)
    const initialCost = calculateSpecialCoinPrice(props.metaData.getSpecialCoinRedeemed())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.bankBalance))
    const [coinLabel, setCoinLabel] = useState(1)
    const [callB, setCallB] = useState(false)
    useEffect(() => {
        const percentageAmount = calculateCoinFromPercentage(props.metaData.bankBalance * percentage, props.metaData.getSpecialCoinRedeemed())
        const coins = !isPercentage ? coinToBuy : percentageAmount
        const coinAmount = props.metaData.getSpecialCoinRedeemed() + coins
        setCoinLabel(coins)
        const newCost = calculateSpecialCoinPrice(coinAmount)
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.bankBalance))
        setCoinToBuy(coins)
    }, [props.metaData.specialCoins, props.metaData.bankBalance, coinToBuy, percentage, coinToBuy, callB])

    return (
        <IonSlide>
            <h2>Special Coin</h2>
            <p><b>Special Coin</b> is a powerful coin that is found in game. You can also buy it for coins</p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {numberWithCommas(cost)} coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {coinLabel} Special coin
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {redeemable &&
            <IonButton fill="clear" onClick={() => {
                const newAmount = props.metaData.storeMetaData.redeemedSpecialCoins + coinToBuy
                const newBalance = props.metaData.bankBalance - cost
                const currentSpecialCoins = props.metaData.specialCoins
                props.metaData.storeMetaData.redeemedSpecialCoins = newAmount
                props.metaData.bankBalance = newBalance
                props.metaData.specialCoins = currentSpecialCoins + coinToBuy
                const newCost = calculateSpecialCoinPrice(newAmount)
                setRedeemable((newCost <= props.metaData.bankBalance))
                setCost(newCost)
                props.setSetMetaData(props.metaData)
                props.setTrans(props.trans)
            }
            }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
            <IonButton fill={"clear"} onClick={() => setShowActionSheet(true)} expand="block">
                Change buy amount
            </IonButton>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                buttons={[{
                    text: '50 % of coins',
                    role: 'destructive',
                    icon: caretForward,
                    handler: () => {
                        setIsPercentage(true)
                        setPercentage(.50)
                        setCallB(!callB)
                    }
                },
                    {
                        text: '25 % of coins',
                        icon: caretForward,
                        handler: () => {
                            setIsPercentage(true)
                            setPercentage(.25)
                            setCallB(!callB)

                        }
                    },
                    {
                        text: '10 % of coins',
                        icon: caretForward,
                        handler: () => {
                            setIsPercentage(true)
                            setPercentage(.10)
                            setCallB(!callB)
                        }
                    }, {
                        text: '10 coins',
                        icon: caretForward,
                        handler: () => {
                            setIsPercentage(false)
                            setCoinToBuy(10)
                            setCallB(!callB)
                        }
                    },
                    {
                        text: '1 coins',
                        icon: caretForward,
                        handler: () => {
                            setIsPercentage(false)
                            setCoinToBuy(1)
                            setCallB(!callB)
                        }
                    },
                    {
                        text: 'Cancel',
                        icon: closeSharp,
                        role: 'cancel',
                        handler: () => {
                        }
                    }]}
            >
            </IonActionSheet>
        </IonSlide>

    );
};


export default SpecialCoinSlide;
