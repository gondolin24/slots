import React from "react";
import {IonAvatar, IonBadge, IonContent, IonItem, IonLabel} from "@ionic/react";

import {AppMetaData} from "../../models/AppMetaData";
import {calculateGodsBonus, calculateMultiplierBonus, calculateWinBonus} from "../../TransactionEngine";


interface BankProps {
    metaData: AppMetaData
}

const Bank: React.FC<BankProps> = (props) => {

    return (
        <IonContent>
            <IonItem>
                <IonAvatar slot={'start'}>
                    <img src={'https://emoji.gg/assets/emoji/6751_Lemon_cringe_zoom.png'}/>
                </IonAvatar> <IonLabel>Coin Amount</IonLabel>
                <IonBadge color={'dark'} slot="end">{props.metaData.bankBalance}</IonBadge>
            </IonItem>
            <IonItem>
                <IonAvatar slot={'start'}>
                    <img src="https://emoji.gg/assets/emoji/6312_poohdance.gif"/>
                </IonAvatar> <IonLabel>Special Coins</IonLabel>
                <IonBadge color={'dark'} slot="end">{props.metaData.specialCoins}</IonBadge>
            </IonItem>
            <IonItem>
                <IonAvatar slot={'start'}>
                    <img src="https://emoji.gg/assets/emoji/2271_ArabDance.gif"/>
                </IonAvatar> <IonLabel>Multiplier Bonus</IonLabel>
                <IonBadge color={'dark'}
                          slot="end">{calculateMultiplierBonus(props.metaData.getMultiplierBonusAmount())}</IonBadge>
            </IonItem>

            <IonItem>
                <IonAvatar slot={'start'}>
                    <img src="https://emoji.gg/assets/emoji/4191_StevenUniverseDance.gif"/>
                </IonAvatar> <IonLabel>Probability of Winning</IonLabel>
                <IonBadge color={'dark'}
                          slot="end">{((calculateWinBonus(props.metaData.getWinBonusAmount()) + .40) * 100) + ' %'}</IonBadge>
            </IonItem>
            <IonItem>
                <IonAvatar slot={'start'}>
                    <img src="https://emoji.gg/assets/emoji/6604_oh_god_sign_bean.png"/>
                </IonAvatar> <IonLabel>Probability zues being angry</IonLabel>
                <IonBadge color={'dark'}
                          slot="end">{((calculateGodsBonus(props.metaData.getGodsCoinRedeemed())) * 100) + ' %'}</IonBadge>
            </IonItem>
        </IonContent>
    );
};
export default Bank;
