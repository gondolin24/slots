import React from 'react';
import {IonButton, IonContent, IonIcon, IonItem, IonLabel, IonSlide, IonSlides} from "@ionic/react";
import {arrowForwardSharp, closeSharp} from 'ionicons/icons';
import BonusMultiplierSlide from "./BonusMultiplierSlide";
import BonusWinChanceSlide from "./BonusWinChanceSlide";

interface RewardsProps {
    setSetMetaData: (val: any) => void
    metaData: any
}

const Rewards: React.FC<RewardsProps> = (props) => {
    return (
        <IonContent fullscreen className="ion-padding" scroll-y="false">
            <IonSlides>
                <IonSlide>
                    <h2>Special Coin</h2>
                    <p><b>Special Coin</b> is a powerful coin that is found in game. You can also buy it for coins</p>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            200,000 coins
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            1 Special coin
                        </IonLabel>
                    </IonItem>
                    <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
                </IonSlide>
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
                            Permanent increase special coin finding by 4%
                        </IonLabel>
                    </IonItem>
                    <IonButton fill="clear">Unable to Redeem <IonIcon slot="end" md={closeSharp}/></IonButton>
                </IonSlide>

            </IonSlides>

        </IonContent>
    );
};


export default Rewards;
