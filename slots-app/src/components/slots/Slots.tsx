import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList, IonFooter,
    IonIcon, IonInput,
    IonItem,
    IonItemDivider,
    IonLabel, IonPage,
    IonRange, IonTitle, IonToggle, IonToolbar
} from '@ionic/react';
import React, {useState} from 'react';
import {cash, chevronDown, chevronUp, pin, walk, warning, wifi, wine} from "ionicons/icons";
import {Temp} from "../../models/Temp";
import LottieStuff from "./LottieStuff";


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

const Slots: React.FC = () => {

    const [metaData, setMetaData] = useState(new Temp(100));
    const [betAmount, setBetAmount] = useState(25)
    const [spin, setSpin] = useState(true)

    // @ts-ignore
    return (
        <IonContent>
            <IonItem>
                <IonLabel color={"dark"}>
                    Bet Amount
                </IonLabel>
                <IonLabel>{betAmount}</IonLabel>
            </IonItem>
            <IonCard>
                <LottieStuff solving={spin} />
            </IonCard>

            <IonButton expand="full" color={"money"} onClick={() => {
                setSpin(!spin)
            }}>SPIN</IonButton>

            <IonItem>
                <IonRange min={0} max={metaData.bankBalance} color="money" pin={true}
                          onIonChange={e => setBetAmount(e.detail.value)}>
                    <IonLabel slot="start">25</IonLabel>
                    <IonLabel slot="end">{metaData.bankBalance}</IonLabel>
                </IonRange>
            </IonItem>
        </IonContent>
    );
};

export default Slots;
