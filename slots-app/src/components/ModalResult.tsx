import {IonButton, IonItem, IonLabel, IonList, IonModal, IonPopover} from "@ionic/react";
import * as React from "react";
import {useEffect, useState} from "react";
import BadgeLabel from "./modal/BadgeLabel";
import {getMaxBet, getMultiplier, getWinningAmount, isJackPot, specialCoinEarned} from "./CalculationEngine";
import Lottieplayer from "./LottiePlayer";
import {jackPotLottie, losingImage, specialCoinLottie, winningImage} from "./lottie/LottieFactory";
import {calculateGodsBonus, calculateMultiplierBonus} from "../TransactionEngine";
import {AppMetaData} from "../models/AppMetaData";
import {numberWithCommas} from "./MetaDataUtils";


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

function popup(doShow: boolean, specialCoins: any, didWC: boolean, fun: () => void, didWin: boolean) {
    if (!doShow && didWC) {
        return (
            <BadgeLabel label={'Special coins'} color={'secondary'}
                        labelValue={specialCoins}/>
        )
    } else {
        if (didWin) {
            return (
                <IonItem>
                    <IonLabel>Winner</IonLabel>
                </IonItem>
            )
        }
    }
}

const ModalResult: React.FC<ModelProps> = (props) => {

    const [showPopover, setShowPopover] = useState(false);
    const [specialC, setSpecialC] = useState(Math.ceil((Math.random() * props.metaData.getRangeRedeemed())))
    const [didWC, setDidWC] = useState(false)


    const performSpecialCoin = () => {
        const bonus = Math.ceil((Math.random() * props.metaData.getRangeRedeemed()))
        const newCoins = bonus + props.metaData.specialCoins
        setSpecialC(bonus)
        props.metaData.specialCoins = newCoins
        props.setSetMetaData(props.metaData)
        setShowPopover(false)
    }

    useEffect(() => {
        if (props.safety) {
            props.setSafety(false)
            const jackPot = isJackPot()
            const bump = calculateMultiplierBonus(props.metaData.getMultiplierBonusAmount())
            const multiplier = getMultiplier(bump, jackPot)
            const winLostAmount = getWinningAmount(props.didWin, multiplier, props.betAmount)
            const multiplierLabel = `${(multiplier - bump).toFixed(2)} X + ${bump.toFixed(2)}`
            const newBalance = (props.didWin) ? (props.metaData.bankBalance + winLostAmount) : (props.metaData.bankBalance - props.betAmount)
            const bankLabel = ((newBalance < 0) ? 0 : newBalance).toString()
            const totalWinningsLabel = (props.didWin) ? (
                <BadgeLabel label={'Total Winnings'} labelValue={numberWithCommas(winLostAmount)} color={'warning'}/>
            ) : (
                <BadgeLabel label={'Total Winnings'} labelValue={` - ${numberWithCommas(props.betAmount)}`}
                            color={'danger'}/>
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
            const scw = specialCoinEarned(getSpecialCoin)
            if (props.metaData.settingsData.popups) {
                setShowPopover(scw)
            } else {
                setDidWC(scw)
                if (scw) {
                    performSpecialCoin()
                }
            }

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
                        {popup(props.metaData.settingsData.popups, specialC, didWC, performSpecialCoin, props.didWin)}
                        <BadgeLabel label={'Bet Amount'} color={'danger'}
                                    labelValue={numberWithCommas(props.betAmount)}/>
                        <BadgeLabel label={'Multiplier'} color={'primary'}
                                    labelValue={props.resultData.multiplierLabel}/>
                        {props.resultData.totalWinningsLabel}
                        <BadgeLabel label={'Bank Balance'} labelValue={numberWithCommas(props.resultData.bankLabel)}
                                    color={'money'}/>

                    </div>

                }
                {
                    !props.didWin &&
                    <div>
                        <IonItem>
                            <IonLabel>Try Again</IonLabel>
                        </IonItem>
                        {popup(props.metaData.settingsData.popups, specialC, didWC, performSpecialCoin, props.didWin)}

                        <BadgeLabel label={'Bet Amount'} color={'danger'}
                                    labelValue={numberWithCommas(props.betAmount)}/>
                        <BadgeLabel label={'Bank Balance'} labelValue={numberWithCommas(props.resultData.bankLabel)}
                                    color={'danger'}/>

                    </div>

                }

            </IonList>
            {
                props.didWin &&
                <IonButton color={'money'} onClick={() => props.setShowModal(false)}>Thanks for playing</IonButton>
            }
            {
                !props.didWin &&
                <IonButton color={'danger'} onClick={() => props.setShowModal(false)}>Thanks for playing</IonButton>
            }
            <IonPopover
                isOpen={showPopover}
                onDidDismiss={e => {
                    performSpecialCoin()
                }}
            >
                <Lottieplayer source={special.src} animationDefault={special.animationDefault}/>
                <p>Special coin earned {specialC}</p>
            </IonPopover>

        </IonModal>
    );
};
export default ModalResult;
