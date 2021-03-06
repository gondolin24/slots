import {IonButton, IonCard, IonContent, IonItem, IonLabel, IonRange} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {Vibration} from '@ionic-native/vibration';
import Lottieplayer from "../LottiePlayer";
import ModalResult from "../ModalResult";
import _ from "lodash";
import {didSpinWin, getMaxBet} from "../CalculationEngine";
import {calculateWinBonus} from "../../TransactionEngine";
import {AppMetaData} from "../../models/AppMetaData";
import {getThemePack} from "../lottie/LottieFactory";
import {numberWithCommas} from "../MetaDataUtils";


function Greeting(themePack: any) {
    return (
        <div className={'derp'}>
            <Lottieplayer source={themePack.slotImage} animationDefault={true}/>
        </div>)
}

interface SlotsInterface {
    setMetaData: (val: any) => void
    metaData: AppMetaData
}

const Slots: React.FC<SlotsInterface> = (props) => {
    const {metaData} = props
    const [themePack, setThemePack] = useState(getThemePack(metaData.theme))
    const [betAmount, setBetAmount] = useState(25)
    const [didWin, setDidWin] = useState(true)
    const initialDisable = metaData.bankBalance < 0
    const [world, setWorld] = useState<string>();

    const [buttonDisable, setButtonDisable] = useState(initialDisable)

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sliderRange, setSliderRange] = useState(metaData.bankBalance);

    useEffect(() => {
        setThemePack(getThemePack(metaData.theme))
        if (metaData.bankBalance < getMaxBet(props.metaData.bankBalance)) {
            setSliderRange(metaData.bankBalance)
        } else {
            setSliderRange(getMaxBet(props.metaData.bankBalance))
        }

    }, [metaData.bankBalance, metaData.theme])

    const [safety, setSafety] = useState(false);
    const [resultData, setResultData] = useState({
        multiplierLabel: '',
        bankLabel: '',
        bonusMultiplierLabel: '',
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
            <IonItem>
                <IonLabel color={"dark"}>
                    Bank Balance
                </IonLabel>
                <IonLabel>{numberWithCommas(metaData.bankBalance)}</IonLabel>


            </IonItem>
            <IonCard>
                {Greeting(themePack)}
            </IonCard>

            <IonButton expand="full" color={"money"} disabled={(metaData.bankBalance < 25)}
                       onClick={(e) => {
                           setSafety(true)
                           setDidWin(didSpinWin(calculateWinBonus(props.metaData.getWinBonusAmount())))
                           setShowModal(true)
                           // @ts-ignore
                           if (metaData.settingsData.vibration) {
                               Vibration.vibrate(500);
                           }
                       }}>BET {numberWithCommas(betAmount)}</IonButton>

            {(metaData.bankBalance >= 25) &&
            <IonItem>
                <IonRange min={25} max={sliderRange} color="money" pin={true}
                          onIonChange={e => {
                              const value: number = _.get(e, 'detail.value', 0)
                              setBetAmount(value)
                          }}>
                    <IonLabel slot="start">25</IonLabel>
                    <IonLabel slot="end">{numberWithCommas(sliderRange)}</IonLabel>
                </IonRange>
            </IonItem>
            }


            <ModalResult setSliderMax={setChildSlider} setBetAmount={setChildBetAmount} resultData={resultData}
                         setResultData={setChildResultData}
                         safety={safety} setSafety={setChildSafety} betAmount={betAmount} setShowModal={setChildModal}
                         showModal={showModal} didWin={didWin}
                         metaData={metaData} setSetMetaData={props.setMetaData}/>

        </IonContent>
    );
};

export default Slots;
