import {IonButton, IonCard, IonContent, IonItem, IonLabel, IonLoading, IonModal, IonRange} from '@ionic/react';
import React, {useState} from 'react';
import {BetService} from "../../BetService";
import Lottieplayer from "../LottiePlayer";
import animatedData from '../../lottie-files/Standard.json'
import ModalResult from "../ModalResult";


function Greeting() {
    return (
        <div className={'derp'}>
            <Lottieplayer source={animatedData} animationDefault={false}/>
        </div>)
}

interface SlotsInterface {
    setMetaData: (val: any) => void
    metaData: any
}
const Slots: React.FC <SlotsInterface>= (props) => {
    const betService = new BetService({})
    const {metaData} = props

    const [betAmount, setBetAmount] = useState(25)
    const [didWin, setDidWin] = useState(true)
    const initialDisable = metaData.bankBalance < 25

    const [buttonDisable, setButtonDisable] = useState(initialDisable)

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    const setChildModal = (val: boolean) => {
        setShowModal(val)
    }

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
                duration={4000}
            />
            <ModalResult betAmount={betAmount} setShowModal={setChildModal} showModal={showModal} didWin={didWin}
                         metaData={metaData} setSetMetaData={props.setMetaData}/>
        </IonContent>
    );
};

export default Slots;
