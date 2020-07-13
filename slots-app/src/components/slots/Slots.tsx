import {IonButton, IonCard, IonContent, IonItem, IonLabel, IonLoading, IonModal, IonRange} from '@ionic/react';
import React, {useState} from 'react';
import {Temp} from "../../models/Temp";
import LottieStuff from "./LottieStuff";
import {BetService} from "../../BetService";
import Lottieplayer from "../LottiePlayer";
import animatedData from '../../lottie-files/Standard.json'


function Greeting() {
    return <Lottieplayer source={animatedData} />
}

//
// function Lost() {
//     const url = 'https://assets8.lottiefiles.com/private_files/lf30_GjhcdO.json'
//     return <LottieStuff lottieUrl={url}/>
// }
//
// function Win() {
//     const url = 'https://assets7.lottiefiles.com/private_files/lf30_4uTjNk.json'
//     return <LottieStuff lottieUrl={url}/>
// }

// function SpinResult(win: boolean) {
//     if (win) return Win()
//
//     return Lost()
//
// }

const Slots: React.FC = () => {
    const betService = new BetService({})

    const [metaData, setMetaData] = useState(new Temp(100));
    const [betAmount, setBetAmount] = useState(25)
    const [didWin, setDidWin] = useState(true)
    const initialDisable = metaData.bankBalance < 25

    const [buttonDisable, setButtonDisable] = useState(initialDisable)

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);


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
                {Greeting()}
            </IonCard>

            <IonButton expand="full" color={"money"} disabled={buttonDisable}
                       onClick={() => {
                           setShowLoading(true)
                       }}>BET</IonButton>

            <IonItem>
                <IonRange min={0} max={metaData.bankBalance} color="money" pin={true}
                          onIonChange={e => setBetAmount(e.detail.value)}>
                    <IonLabel slot="start">25</IonLabel>
                    <IonLabel slot="end">{metaData.bankBalance}</IonLabel>
                </IonRange>
            </IonItem>

            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => {
                    setShowLoading(false)
                    setDidWin(betService.getSpinResults)
                    setShowModal(true)
                }}
                message={'Calculating Winnings'}
                duration={5000}
            />
            <IonModal isOpen={showModal}>
                {/*{SpinResult(didWin)}*/}
                <IonButton onClick={() => setShowModal(false)}>Thanks for playing</IonButton>
            </IonModal>
        </IonContent>
    );
};

export default Slots;
