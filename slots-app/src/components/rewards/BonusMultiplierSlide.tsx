import React, {useEffect, useState} from 'react';
import {IonAvatar, IonBadge, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonSlide} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import {calculateMultiplierBonus, calculateMultiplierBonusPrice, calculateWinBonusPrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";
import {numberWithCommas} from "../MetaDataUtils";

interface SlideProps {
    trans: boolean
    setTrans: (val: any) => void
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const BonusMultiplierSlide: React.FC<SlideProps> = (props) => {

    const initialCost = calculateMultiplierBonusPrice(props.metaData.getMultiplierBonusAmount())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.specialCoins))
    useEffect(() => {
        const newCost = calculateMultiplierBonusPrice(props.metaData.getMultiplierBonusAmount())
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.specialCoins))
    }, [props.metaData.specialCoins, props.metaData.bankBalance])

    return (
        <IonSlide>
            <IonItem>
                <IonLabel>Multiplier Bonus</IonLabel>
                <IonBadge color={'dark'}
                          slot="end">{calculateMultiplierBonus(props.metaData.getMultiplierBonusAmount())}</IonBadge>
            </IonItem>
            <h2>Multiplier Bonus</h2>
            <p><b>Multiplier Bonus</b> This bonus scales vertically. Permanently adds a bonus to every win
                on-top the default multiplier</p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {numberWithCommas( calculateMultiplierBonusPrice(props.metaData.getMultiplierBonusAmount()))} special coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    Permanent + 0.25 multiplier
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {(redeemable) &&
            <IonButton fill="clear" onClick={() => {
                const newAmount = props.metaData.storeMetaData.redeemedMultiplierBonus + 1
                const newBalance = props.metaData.specialCoins - cost
                props.metaData.storeMetaData.redeemedMultiplierBonus = newAmount
                props.metaData.specialCoins = newBalance
                const newCost = calculateMultiplierBonusPrice(newBalance)

                setRedeemable((newCost <= props.metaData.specialCoins))
                props.setSetMetaData(props.metaData)
                props.setTrans(props.trans)

            }
            }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
        </IonSlide>

    );
};


export default BonusMultiplierSlide;
