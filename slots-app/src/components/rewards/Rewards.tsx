import React from 'react';
import {IonButton, IonContent, IonIcon, IonItem, IonLabel, IonSlide, IonSlides} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import BonusMultiplierSlide from "./BonusMultiplierSlide";
import BonusWinChanceSlide from "./BonusWinChanceSlide";
import SpecialCoinSlide from "./SpecialCoinSlide";

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

                <IonSlide>
                    <h2>Extra Special Coin</h2>
                    <p><b>Extra Special Coin</b> is an even more powerful coin. With this, the gods will look down on
                        you</p>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            30 Special coins
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            + 4% chance to find special coin
                        </IonLabel>
                    </IonItem>
                    <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
                </IonSlide>

            </IonSlides>

        </IonContent>
    );
};


export default Rewards;
