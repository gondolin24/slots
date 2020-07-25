import React, {useEffect, useState} from 'react';
import {
    IonAvatar, IonBadge,
    IonButton,
    IonContent, IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import BonusMultiplierSlide from "./BonusMultiplierSlide";
import BonusWinChanceSlide from "./BonusWinChanceSlide";
import SpecialCoinSlide from "./SpecialCoinSlide";
import GodsCoinSlide from "./GodsCoinSlide";
import {AppMetaData} from "../../models/AppMetaData";

interface RewardsProps {
    setSetMetaData: (val: any) => void
    metaData: AppMetaData
}

const Rewards: React.FC<RewardsProps> = (props) => {

    const [trans, setTrans] = useState(false)
    const setChildTrans = (val: boolean) => {
        setTrans(!val)
    }


    return (
        <IonContent fullscreen className="ion-padding" scroll-y="false">
            <IonItem>
                <IonLabel>Coin Amount</IonLabel>
                <IonBadge color={'tertiary'} slot="end">{props.metaData.bankBalance}</IonBadge>
            </IonItem>
            <IonItem>
                <IonLabel>Special Coins</IonLabel>
                <IonBadge color={'warning'} slot="end">{props.metaData.specialCoins}</IonBadge>
            </IonItem>
            <IonSlides>
                <SpecialCoinSlide setTrans={setChildTrans} trans={trans} setSetMetaData={props.setSetMetaData}
                                  metaData={props.metaData}/>
                <BonusMultiplierSlide setTrans={setChildTrans} trans={trans} setSetMetaData={props.setSetMetaData}
                                      metaData={props.metaData}/>
                <BonusWinChanceSlide setTrans={setChildTrans} trans={trans} setSetMetaData={props.setSetMetaData}
                                     metaData={props.metaData}/>
                <GodsCoinSlide setTrans={setChildTrans} trans={trans} setSetMetaData={props.setSetMetaData}
                               metaData={props.metaData}/>

            </IonSlides>

        </IonContent>

    );
};


export default Rewards;
