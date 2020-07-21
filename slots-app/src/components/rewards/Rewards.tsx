import React from 'react';
import {IonButton, IonContent, IonIcon, IonItem, IonLabel, IonSlide, IonSlides} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import BonusMultiplierSlide from "./BonusMultiplierSlide";
import BonusWinChanceSlide from "./BonusWinChanceSlide";
import SpecialCoinSlide from "./SpecialCoinSlide";
import GodsCoinSlide from "./GodsCoinSlide";

interface RewardsProps {
    setSetMetaData: (val: any) => void
    metaData: any
}

const Rewards: React.FC<RewardsProps> = (props) => {
    return (
        <IonContent fullscreen className="ion-padding" scroll-y="false">
            <IonSlides>
                <SpecialCoinSlide setSetMetaData={props.setSetMetaData} metaData={props.metaData}/>
                <BonusMultiplierSlide setSetMetaData={props.setSetMetaData} metaData={props.metaData}/>

                <BonusWinChanceSlide setSetMetaData={props.setSetMetaData} metaData={props.metaData}/>
                <GodsCoinSlide setSetMetaData={props.setSetMetaData} metaData={props.metaData}/>

            </IonSlides>

        </IonContent>
    );
};


export default Rewards;
