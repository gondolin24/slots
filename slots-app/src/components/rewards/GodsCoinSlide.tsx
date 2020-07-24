import React, {useEffect, useState} from 'react';
import {IonBadge, IonButton, IonIcon, IonItem, IonLabel, IonSlide, IonSlides} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import {calculateGodsBonusPrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";

interface SlideProps {
    trans: boolean
    setTrans: (val: any) => void
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const GodsCoinSlide: React.FC<SlideProps> = (props) => {

    const initialCost = calculateGodsBonusPrice(props.metaData.getGodsCoinRedeemed())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.specialCoins))
    useEffect(() => {
        const newCost = calculateGodsBonusPrice(props.metaData.getGodsCoinRedeemed())
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.specialCoins))
    }, [props.metaData.specialCoins, props.metaData.bankBalance])

    return (
        <IonSlide>
            <h2>Extra Special Coin</h2>
            <p><b>Extra Special Coin</b> is an even more powerful coin. With this, the gods will look down upon you</p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {cost} Special coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    + 4% chance to find special coin
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {(redeemable && props.metaData.getGodsCoinRedeemed() <= 25) &&
            <IonButton fill="clear" onClick={() => {
                const newAmount = props.metaData.storeMetaData.redeemedGodsCoin + 1
                const newBalance = props.metaData.specialCoins - cost

                props.metaData.storeMetaData.redeemedGodsCoin = newAmount
                props.metaData.specialCoins = newBalance
                const newCost = calculateGodsBonusPrice(newBalance)
                setRedeemable((newCost <= props.metaData.specialCoins))
                props.setSetMetaData(props.metaData)
                props.setTrans(props.trans)
            }
            }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
        </IonSlide>

    );
};


export default GodsCoinSlide;
