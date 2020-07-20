import React, {useEffect, useState} from 'react';
import {IonButton, IonIcon, IonItem, IonLabel, IonSlide} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import {calculateSpecialCoinPrice} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";

interface SlideProps {
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const SpecialCoinSlide: React.FC<SlideProps> = (props) => {

    const initialCost = calculateSpecialCoinPrice(props.metaData.getSpecialCoinRedeemed())
    const [cost, setCost] = useState(initialCost)
    const [redeemable, setRedeemable] = useState((cost <= props.metaData.bankBalance))
    useEffect(() => {
        const newCost = calculateSpecialCoinPrice(props.metaData.getSpecialCoinRedeemed())
        setCost(newCost)
        setRedeemable((newCost <= props.metaData.bankBalance))
    }, [props.metaData.bankBalance])

    return (
        <IonSlide>
            <h2>Special Coin</h2>
            <p><b>Special Coin</b> is a powerful coin that is found in game. You can also buy it for coins</p>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    {cost} coins
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className={'center-align-label'}>
                    1 Special coin
                </IonLabel>
            </IonItem>
            {!redeemable &&
            <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
            }
            {redeemable &&
            <IonButton fill="clear" onClick={() => {
                const newAmount = props.metaData.storeMetaData.redeemedSpecialCoins + 1
                const newBalance = props.metaData.bankBalance - cost
                const currentSpecialCoins = props.metaData.specialCoins
                props.metaData.storeMetaData.redeemedSpecialCoins = newAmount
                props.metaData.bankBalance = newBalance
                props.metaData.specialCoins = currentSpecialCoins + 1

                const newCost = calculateSpecialCoinPrice(newAmount)
                setRedeemable((newCost <= props.metaData.bankBalance))
                props.setSetMetaData(props.metaData)
            }
            }>Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
            }
        </IonSlide>

    );
};


export default SpecialCoinSlide;
