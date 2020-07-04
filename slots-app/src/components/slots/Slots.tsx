import {
    IonButton,
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
import {cash, chevronDown, chevronUp} from "ionicons/icons";
import {Temp} from "../../models/Temp";

const Slots: React.FC = () => {

    const [metaData, setMetaData] = useState(new Temp(100));
    const [betAmount, setBetAmount] = useState(0)

    // @ts-ignore
    return (
        <IonContent>
            <IonItem>
                <IonLabel color={"dark"}>
                  Bet Amount
                </IonLabel>
                <IonLabel>{betAmount}</IonLabel>
            </IonItem>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color={'money'}>
                    <IonIcon icon={cash}/>
                </IonFabButton>
                <IonFabList side="top">
                    <IonFabButton color={'money'}><IonIcon icon={chevronUp} onClick={() => setMetaData(() => {
                        metaData.bankBalance = metaData.bankBalance + 10
                        console.log(metaData.bankBalance)
                        return metaData
                    })}/></IonFabButton>
                </IonFabList>
                <IonFabList side="bottom">
                    <IonFabButton color={'money'}><IonIcon icon={chevronDown}/></IonFabButton>
                </IonFabList>
            </IonFab>

            <IonButton expand="full" color={"money"}>SPIN</IonButton>

            <IonItem>
                <IonRange min={0} max={metaData.bankBalance} color="money" pin={true}
                          onIonChange={e => setBetAmount(e.detail.value)}>
                    <IonLabel slot="start">0</IonLabel>
                    <IonLabel slot="end">{metaData.bankBalance}</IonLabel>
                </IonRange>
            </IonItem>




        </IonContent>
    );
};

export default Slots;
