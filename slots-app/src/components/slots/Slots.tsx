import {IonButton, IonCard, IonContent, IonItem, IonLabel, IonLoading, IonModal, IonRange} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {Vibration} from '@ionic-native/vibration';
import Lottieplayer from "../LottiePlayer";
import animatedData from '../../lottie-files/Standard.json'
import ModalResult from "../ModalResult";
import _ from "lodash";
import {didSpinWin} from "../CalculationEngine";
import {MAX_BET} from "../../SlotConfig";


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
    // console.log(initialSlider)
    const [betAmount, setBetAmount] = useState(1)
    const [didWin, setDidWin] = useState(true)
    const initialDisable = metaData.bankBalance < 0

    const [buttonDisable, setButtonDisable] = useState(initialDisable)

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sliderRange, setSliderRange] = useState(metaData.bankBalance);

    useEffect(() => {
        if (metaData.bankBalance < MAX_BET) {
            setSliderRange(metaData.bankBalance)
        } else {
            setSliderRange(MAX_BET)
        }

    })

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
    const setChildSlider = (val: any) => {
        setSliderRange(val)
    }

    return (
        <IonContent>
            {/*<IonItem>*/}
            {/*    <IonLabel color={"dark"}>*/}
            {/*        Bet Amount*/}
            {/*    </IonLabel>*/}
            {/*    <IonLabel>{betAmount}</IonLabel>*/}
            {/*</IonItem>*/}
            <IonItem>
                <IonLabel color={"dark"}>
                    Bank Balance
                </IonLabel>
                <IonLabel>{metaData.bankBalance}</IonLabel>
            </IonItem>
            <IonCard>
                {Greeting()}
            </IonCard>

            <IonButton expand="full" color={"money"} disabled={buttonDisable}
                       onClick={(e) => {
                           setSafety(true)
                           setDidWin(didSpinWin())
                           setShowModal(true)
                           // @ts-ignore
                           Vibration.vibrate(500);
                       }}>BET {betAmount}</IonButton>

            <IonItem>
                <IonRange min={1} max={sliderRange} color="money" pin={true}
                          onIonChange={e => {
                              const value: number = _.get(e, 'detail.value', 0)
                              setBetAmount(value)
                          }}>
                    <IonLabel slot="start">1</IonLabel>
                    <IonLabel slot="end">{sliderRange}</IonLabel>
                </IonRange>
            </IonItem>

            <ModalResult setSliderMax={setChildSlider} setBetAmount={setChildBetAmount} resultData={resultData}
                         setResultData={setChildResultData}
                         safety={safety} setSafety={setChildSafety} betAmount={betAmount} setShowModal={setChildModal}
                         showModal={showModal} didWin={didWin}
                         metaData={metaData} setSetMetaData={props.setMetaData}/>

        </IonContent>
    );
};

export default Slots;
