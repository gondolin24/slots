import {IonButton, IonCard, IonContent, IonItem, IonLabel, IonLoading, IonModal, IonRange} from '@ionic/react';
import React, {useState} from 'react';
import {Vibration} from '@ionic-native/vibration';
import Lottieplayer from "../LottiePlayer";
import animatedData from '../../lottie-files/Standard.json'
import ModalResult from "../ModalResult";
import _ from "lodash";
import {didSpinWin} from "../CalculationEngine";


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

const Slots: React.FC<SlotsInterface> = (props) => {
    const {metaData} = props
    const [betAmount, setBetAmount] = useState(1)
    const [didWin, setDidWin] = useState(true)
    const initialDisable = metaData.bankBalance < 0

    const [buttonDisable, setButtonDisable] = useState(initialDisable)

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [derp, setDerp] = useState(false);

    const [safety, setSafety] = useState(false);
    const [resultData, setResultData] = useState({
        multiplierLabel: '',
        bankLabel: '',
        totalWinningsLabel: (<div/>),
        spinResults: (<div/>)
    })

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    const setChildModal = (val: boolean) => {
        setShowModal(val)
    }
    const setChildSafety = (val: boolean) => {
        setSafety(val)
    }
    const setChildResultData = (val: any) => {
        setResultData(val)
    }
    const setChildBetAmount = (val: any) => {
        setBetAmount(val)
    }

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
                       onClick={(e) => {
                           setSafety(true)

                           setShowModal(false)
                           setDidWin(didSpinWin())
                           setShowModal(true)
                               // @ts-ignore
                           Vibration.vibrate(1000);
                       }}>BET</IonButton>

            <IonItem>
                <IonRange min={1} max={metaData.bankBalance} color="money" pin={true}
                          onIonChange={e => {
                              const value: number = _.get(e, 'detail.value', 0)
                              setBetAmount(value)
                          }}>
                    <IonLabel slot="start">1</IonLabel>
                    <IonLabel slot="end">{metaData.bankBalance}</IonLabel>
                </IonRange>
            </IonItem>

            {/*<IonLoading*/}
            {/*    cssClass='my-custom-class'*/}
            {/*    isOpen={showLoading}*/}
            {/*    onDidDismiss={() => {*/}
            {/*        setDidWin(didSpinWin())*/}
            {/*        setShowModal(true)*/}
            {/*        setShowLoading(false)*/}
            {/*        setSafety(true)*/}
            {/*    }}*/}
            {/*    message={'Calculating Winnings'}*/}
            {/*    duration={4000}*/}
            {/*/>*/}

            <ModalResult setBetAmount={setChildBetAmount} resultData={resultData} setResultData={setChildResultData}
                         safety={safety} setSafety={setChildSafety} betAmount={betAmount} setShowModal={setChildModal}
                         showModal={showModal} didWin={didWin}
                         metaData={metaData} setSetMetaData={props.setMetaData}/>

        </IonContent>
    );
};

export default Slots;
