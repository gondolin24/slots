import React, {useEffect, useState} from 'react';
import {IonBadge, IonButton, IonIcon, IonItem, IonLabel, IonSlide} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import {calculateWinBonusPrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";

interface SlideProps {
    trans: boolean
    setTrans: (val: any) => void
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const BonusWinChanceSlide: React.FC<SlideProps> = (props) => {

    const initialCost = calculateWinBonusPrice(props.metaData.getWinBonusAmount())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.specialCoins))
    useEffect(() => {
        const newCost = calculateWinBonusPrice(props.metaData.getWinBonusAmount())
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.specialCoins))
    }, [props.metaData.specialCoins, props.metaData.bankBalance])

    return (
        <IonSlide>

            <h2>Win Chance</h2>
            <p><b>Win Change</b> is a powerful bonus. Permanently adds % change of winning. </p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {cost} special coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    Permanent + 3% change of winning
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {(redeemable && props.metaData.getWinBonusAmount() <= 20) &&
            <IonButton fill="clear" onClick={() => {
                const newAmount = props.metaData.storeMetaData.redeemedWinChance + 1
                const newBalance = props.metaData.specialCoins - cost

                props.metaData.storeMetaData.redeemedWinChance = newAmount
                props.metaData.specialCoins = newBalance
                const newCost = calculateWinBonusPrice(newBalance)
                setRedeemable((newCost <= props.metaData.specialCoins))
                props.setSetMetaData(props.metaData)
                props.setTrans(props.trans)

            }
            }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
        </IonSlide>

    );
};


export default BonusWinChanceSlide;
