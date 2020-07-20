import React from 'react';
import {IonButton, IonContent, IonIcon, IonItem, IonLabel, IonSlide, IonSlides} from "@ionic/react";
import {arrowForwardSharp} from 'ionicons/icons';

const Rewards: React.FC = () => {
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
                    <IonButton fill="clear">Can't Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
                </IonSlide>

                <IonSlide>
                    <h2>Multiplier Bonus</h2>
                    <p><b>Multiplier Bonus</b> This bonus scales vertically. Permanently adds a bonus to every win
                        on-top the default multiplier</p>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            20 special coins
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            Permanent + 0.25 multiplier
                        </IonLabel>
                    </IonItem>
                    <IonButton fill="clear">Can't Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
                </IonSlide>


                <IonSlide>
                    <h2>Win Chance</h2>
                    <p><b>Win Change</b> is a powerful bonus. Permanently adds % change of winning. </p>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            20 special coins
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel className={'center-align-label'}>
                            Permanent + 3% change of winning
                        </IonLabel>
                    </IonItem>
                    <IonButton fill="clear">Can't Redeem <IonIcon slot="end" md={arrowForwardSharp}/></IonButton>
                </IonSlide>


            </IonSlides>
        </IonContent>
    );
};


export default Rewards;
