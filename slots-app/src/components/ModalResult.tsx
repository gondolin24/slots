import {IonButton, IonItem, IonLabel, IonList, IonModal} from "@ionic/react";
import * as React from "react";
import BadgeLabel from "./modal/BadgeLabel";
import {getMultiplier, getWinningAmount, isJackPot} from "./CalculationEngine";
import {useEffect, useRef} from "react";
import {Plugins} from '@capacitor/core';
import Lottieplayer from "./LottiePlayer";
import {jackPotLottie, losingImage, winningImage} from "./lottie/LottieFactory";

const {Storage} = Plugins;

interface ModelProps {
    setShowModal: (val: boolean) => void
    setSetMetaData: (val: any) => void
    setSafety: (val: any) => void
    safety: boolean
    showModal: boolean
    didWin: boolean
    betAmount: number
    metaData: any
    resultData: any
    setResultData: (val: any) => void
    setBetAmount: (val: any) => void
}


function Lost() {
    const {src, animationDefault} = losingImage()

    return (
        <div className={'loser'}>
            <Lottieplayer source={src} animationDefault={animationDefault}/>
        </div>
    )
}

function Win() {
    const {src, animationDefault, className} = winningImage()
    return (
        <div className={className}>
            <Lottieplayer source={src} animationDefault={animationDefault}/>
        </div>
    )
}

function SpinResult(win: boolean) {
    if (win) return Win()
    return Lost()
}


const ModalResult: React.FC<ModelProps> = (props) => {

    useEffect(() => {
        if (props.safety) {
            props.setSafety(false)
            const jackPot: boolean = isJackPot()
            const multiplier = getMultiplier(0, jackPot)
            const winLostAmount = getWinningAmount(props.didWin, multiplier, props.betAmount)
            const multiplierLabel = `${multiplier.toFixed(2)} X`
            const newBalance = (props.didWin) ? (props.metaData.bankBalance + winLostAmount) : (props.metaData.bankBalance - props.betAmount)
            const bankLabel = ((newBalance < 5) ? 6 : newBalance).toString()
            const totalWinningsLabel = (props.didWin) ? (
                <BadgeLabel label={'Total Winnings'} labelValue={winLostAmount.toString()} color={'warning'}/>
            ) : (
                <BadgeLabel label={'Total Winnings'} labelValue={` - ${props.betAmount}`} color={'danger'}/>
            )
            const spinResults = (jackPot) ? jackPotLottie() : SpinResult(props.didWin)
            const data = {
                bankLabel,
                totalWinningsLabel,
                multiplierLabel,
                spinResults
            }
            console.log('here')
            props.setResultData(data)
            props.metaData.bankBalance = (newBalance < 5) ? 6 : newBalance
            const json = props.metaData.toJson()
            props.setSetMetaData(props.metaData)

            if (newBalance < props.metaData.bankBalance) {
                props.setBetAmount(props.metaData.bankBalance)
            }
            Storage.set({
                key: 'metaData',
                value: JSON.stringify(json)
            }).then(() => {
            }).catch(() => {
            })

        }
    })

    document.addEventListener('ionBackButton', (ev) => {
        // @ts-ignore
        ev.detail.register(10, () => {
            props.setShowModal(false)
        });
    });

    return (
        <IonModal isOpen={props.showModal}>
            {props.resultData.spinResults}

            <IonList>
                <IonItem>
                    <IonLabel>Results</IonLabel>
                </IonItem>
                <BadgeLabel label={'Bet Amount'} color={'danger'} labelValue={props.betAmount.toString()}/>
                <BadgeLabel label={'Multiplier'} color={'primary'} labelValue={props.resultData.multiplierLabel}/>
                {props.resultData.totalWinningsLabel}
                <BadgeLabel label={'Bank Balance'} labelValue={props.resultData.bankLabel} color={'money'}/>
            </IonList>

            <IonButton onClick={() => props.setShowModal(false)}>Thanks for playing</IonButton>

        </IonModal>
    );
};
export default ModalResult;
