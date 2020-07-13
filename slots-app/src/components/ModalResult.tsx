import {IonButton, IonItem, IonLabel, IonList, IonModal} from "@ionic/react";
import * as React from "react";
import BadgeLabel from "./modal/BadgeLabel";
import {getMultiplier, getWinningAmount} from "./CalculationEngine";
import {useEffect} from "react";
import {Plugins} from '@capacitor/core';
import * as WinnerOne from '../lottie-files/winner/winner-one.json'
import * as WinnerTwo from '../lottie-files/winner/winner-two.json'
import * as LoserOne from '../lottie-files/loser/loser-one.json'
import Lottieplayer from "./LottiePlayer";

const {Storage} = Plugins;

interface ModelProps {
    setShowModal: (val: boolean) => void
    setSetMetaData: (val: any) => void

    showModal: boolean
    didWin: boolean
    betAmount: number
    metaData: any
}


function Lost() {
    return (
        <div className={'loser'}>
            <Lottieplayer source={LoserOne} animationDefault={true}/>
        </div>
    )
}

function Win() {
    const random = Math.floor(Math.random() * 10)

    if (random < 5) {
        return (
            <div className={'winnerNoneGreen'}>
                <Lottieplayer source={WinnerTwo} animationDefault={true}/>
            </div>
        )
    }
    return (
        <div className={'winner'}>
            <Lottieplayer source={WinnerOne} animationDefault={true}/>
        </div>
    )
}

function SpinResult(win: boolean) {
    if (win) return Win()
    return Lost()
}

const ModalResult: React.FC<ModelProps> = (props) => {

    const multiplier = getMultiplier(0)
    const winLostAmount = getWinningAmount(props.didWin, multiplier, props.betAmount)
    const multiplierLabel = `${multiplier.toFixed(2)} X`
    const bankBalance = props.metaData.bankBalance
    const newBalance = (props.didWin) ? (bankBalance + winLostAmount) : (bankBalance - props.betAmount)
    const bankLabel = ((newBalance < 25) ? 26 : newBalance).toString()
    const totalWinningsLabel = (props.didWin) ? (
        <BadgeLabel label={'Total Winnings'} labelValue={winLostAmount.toString()} color={'warning'}/>
    ) : (
        <BadgeLabel label={'Total Winnings'} labelValue={` - ${props.betAmount}`} color={'danger'}/>
    )
    useEffect(() => {
        if (props.showModal) {
            props.metaData.bankBalance = (newBalance < 25) ? 26 : newBalance
            const json = props.metaData.toJson()
            props.setSetMetaData(props.metaData)
            Storage.set({
                key: 'metaData',
                value: JSON.stringify(json)
            }).then(() => {
            }).catch(() => {
            })

        }
    })

    return (
        <IonModal isOpen={props.showModal}>
            {SpinResult(props.didWin)}
            <IonList>
                <IonItem>
                    <IonLabel>Results</IonLabel>
                </IonItem>
                <BadgeLabel label={'Bet Amount'} color={'danger'} labelValue={props.betAmount.toString()}/>
                <BadgeLabel label={'Multiplier'} color={'primary'} labelValue={multiplierLabel}/>
                {totalWinningsLabel}
                <BadgeLabel label={'Bank Balance'} labelValue={bankLabel} color={'money'}/>
            </IonList>

            <IonButton onClick={() => props.setShowModal(false)}>Thanks for playing</IonButton>

        </IonModal>
    );
};
export default ModalResult;
