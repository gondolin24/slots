import {IonButton, IonItem, IonLabel, IonList, IonModal, IonPopover} from "@ionic/react";
import * as React from "react";
import {useEffect, useState} from "react";
import BadgeLabel from "./modal/BadgeLabel";
import {getMaxBet, getMultiplier, getWinningAmount, isJackPot, specialCoinEarned} from "./CalculationEngine";
import Lottieplayer from "./LottiePlayer";
import {jackPotLottie, losingImage, specialCoinLottie, winningImage} from "./lottie/LottieFactory";
import {calculateGodsBonus, calculateMultiplierBonus} from "../TransactionEngine";
import {AppMetaData} from "../models/AppMetaData";


interface ModelProps {
    setShowModal: (val: boolean) => void
    setSetMetaData: (val: any) => void
    setSafety: (val: any) => void
    safety: boolean
    showModal: boolean
    didWin: boolean
    betAmount: number
    metaData: AppMetaData
    resultData: any
    setResultData: (val: any) => void
    setBetAmount: (val: any) => void
    setSliderMax: (val: any) => void

}


function Lost(theme: string) {
    const {src, animationDefault} = losingImage(theme)

    return (
        <div className={'loser'}>
            <Lottieplayer source={src} animationDefault={animationDefault}/>
        </div>
    )
}

function Win(meta: AppMetaData) {
    const {src, animationDefault, className} = winningImage(meta.theme)
    return (
        <div className={className}>
            <Lottieplayer source={src} animationDefault={animationDefault}/>
        </div>
    )
}

function JackPotLottie() {
    const {src, animationDefault, className} = jackPotLottie()
    return (
        <div className={className}>
            <Lottieplayer source={src} animationDefault={animationDefault}/>
        </div>
    )

}

function SpinResult(win: boolean, metaData: AppMetaData) {
    if (win) return Win(metaData)
    return Lost(metaData.theme)
}


const ModalResult: React.FC<ModelProps> = (props) => {

    const [showPopover, setShowPopover] = useState(false);
    useEffect(() => {
        if (props.safety) {
            props.setSafety(false)
            const jackPot = isJackPot()
            const bump = calculateMultiplierBonus(props.metaData.getMultiplierBonusAmount())
            const multiplier = getMultiplier(bump, jackPot)
            const winLostAmount = getWinningAmount(props.didWin, multiplier, props.betAmount)
            const multiplierLabel = `${(multiplier - bump).toFixed(2)} X + ${bump}`
            const newBalance = (props.didWin) ? (props.metaData.bankBalance + winLostAmount) : (props.metaData.bankBalance - props.betAmount)
            const bankLabel = ((newBalance < 0) ? 0 : newBalance).toString()
            const totalWinningsLabel = (props.didWin) ? (
                <BadgeLabel label={'Total Winnings'} labelValue={winLostAmount.toString()} color={'warning'}/>
            ) : (
                <BadgeLabel label={'Total Winnings'} labelValue={` - ${props.betAmount}`} color={'danger'}/>
            )

            const spinResults = (jackPot && props.didWin) ? JackPotLottie() : SpinResult(props.didWin, props.metaData)
            const data = {
                bankLabel,
                totalWinningsLabel,
                multiplierLabel,
                spinResults,
                bonusMultiplierLabel: `${bump}`
            }
            props.setResultData(data)
            const oldBalance = props.metaData.bankBalance
            props.metaData.bankBalance = (newBalance < 0) ? 0 : newBalance
            const oldBet = props.betAmount
            props.setSetMetaData(props.metaData)

            if (oldBet <= newBalance) {
                props.setBetAmount(oldBet)
            } else {
                props.setBetAmount(newBalance)
            }

            if (newBalance < getMaxBet(props.metaData.bankBalance)) {
                props.setSliderMax(newBalance)
            } else {
                props.setSliderMax(getMaxBet(props.metaData.bankBalance))
            }
            const getSpecialCoin = calculateGodsBonus(props.metaData.getGodsCoinRedeemed())
            setShowPopover(specialCoinEarned(getSpecialCoin))
        }
    })

    document.addEventListener('ionBackButton', (ev) => {
        // @ts-ignore
        ev.detail.register(10, () => {
            props.setShowModal(false)
        });
    });
    const special = specialCoinLottie(props.metaData.theme)

    return (
        <IonModal isOpen={props.showModal}>

            {!props.safety && props.resultData.spinResults}

            <IonList>

                {
                    props.didWin &&
                    <div>
                        <IonItem>
                            <IonLabel>Winner</IonLabel>
                        </IonItem>

                        <BadgeLabel label={'Bet Amount'} color={'danger'} labelValue={props.betAmount.toString()}/>
                        <BadgeLabel label={'Multiplier'} color={'primary'}
                                    labelValue={props.resultData.multiplierLabel}/>
                        {props.resultData.totalWinningsLabel}
                        <BadgeLabel label={'Bank Balance'} labelValue={props.resultData.bankLabel} color={'money'}/>

                    </div>

                }
                {
                    !props.didWin &&
                    <div>
                        <IonItem>
                            <IonLabel>Try Again</IonLabel>
                        </IonItem>

                        <BadgeLabel label={'Bet Amount'} color={'danger'} labelValue={props.betAmount.toString()}/>
                        <BadgeLabel label={'Bank Balance'} labelValue={props.resultData.bankLabel} color={'danger'}/>

                    </div>

                }


            </IonList>

            <IonButton onClick={() => props.setShowModal(false)}>Thanks for playing</IonButton>

            <IonPopover
                isOpen={showPopover}
                cssClass='my-custom-class'
                onDidDismiss={e => {
                    const bonus = ((Math.random() * 100) < 2) ? 1 : 0
                    const nani = ((Math.random() * 1000) < 2) ? 1 : 0
                    const newCoins = 1 + nani + bonus + props.metaData.specialCoins
                    props.metaData.specialCoins = newCoins
                    props.setSetMetaData(props.metaData)
                    setShowPopover(false)
                }}
            >
                <Lottieplayer source={special.src} animationDefault={special.animationDefault}/>
                <p>Special coin earned</p>
            </IonPopover>

        </IonModal>
    );
};
export default ModalResult;
