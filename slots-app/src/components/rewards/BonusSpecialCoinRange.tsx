import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonBadge,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonSlide,
    IonSlides
} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import {calculateRangePrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";
import {numberWithCommas} from "../MetaDataUtils";

interface SlideProps {
    trans: boolean
    setTrans: (val: any) => void
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const BonusSpecialCoinRange: React.FC<SlideProps> = (props) => {

    const initialCost = calculateRangePrice(props.metaData.getRangeRedeemed())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.specialCoins))

    useEffect(() => {
        const newCost = calculateRangePrice(props.metaData.getRangeRedeemed())
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.specialCoins))
    }, [props.metaData.specialCoins, props.metaData.bankBalance])

    return (
        <IonSlide>
            <IonItem>
                <IonLabel>Scope range</IonLabel>
                <IonBadge color={'dark'}
                          slot="end">1 - {props.metaData.getRangeRedeemed()}</IonBadge>
            </IonItem>
            <h2>Scope upgrade</h2>
            <p><b>Special scope</b> when upgraded, you can now see the further. The higher the range, the better.
                Is it worth the price to see more special coins?
            </p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {numberWithCommas(cost)} Special coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    +1 range
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {redeemable &&
                <IonButton fill="clear" onClick={() => {
                    const newAmount = props.metaData.storeMetaData.redeemedRange + 1
                    const newBalance = props.metaData.specialCoins - cost
                    props.metaData.storeMetaData.redeemedRange = newAmount
                    props.metaData.specialCoins = newBalance
                    const newCost = calculateRangePrice(newBalance)
                    setRedeemable((newCost <= props.metaData.specialCoins))
                    props.setSetMetaData(props.metaData)
                    props.setTrans(props.trans)
                }
                }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
        </IonSlide>

    );
};


export default BonusSpecialCoinRange;
