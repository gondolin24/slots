import * as WinnerOne from '../../lottie-files/winner/winner-one.json'
import * as WinnerTwo from '../../lottie-files/winner/winner-two.json'
import * as WinnerThree from '../../lottie-files/winner/winner-three.json'
import * as SpecialCoin from '../../lottie-files/winner/special-coin.json'

import * as JackPot from '../../lottie-files/winner/jackpot.json'

import * as LoserOne from '../../lottie-files/loser/loser-one.json'
import * as LoserTwo from '../../lottie-files/loser/loser-two.json'
import * as LoserThree from '../../lottie-files/loser/loser-three.json'

import * as DefaultSlotImage from '../../lottie-files/Standard.json'
import * as DogSlot from '../../lottie-files/themes/Dogs/slot/SlotImage.json'
import * as DogSpecialCoin from '../../lottie-files/themes/Dogs/specialCoins/Winner.json'
import * as DogWinnerOne from '../../lottie-files/themes/Dogs/winner/winner-one.json'
import * as DogWinnerTwo from '../../lottie-files/themes/Dogs/winner/winner-two.json'
import * as DogWinnerThree from '../../lottie-files/themes/Dogs/winner/winner-three.json'

export function jackPotLottie() {
    return {
        src: JackPot,
        animationDefault: true,
        className: 'winner'
    }
}

export function specialCoinLottie(theme: string = 'default') {
    if (theme !== 'default') {
        return {
            src: DogSpecialCoin,
            animationDefault: true,
            className: 'winner'
        }
    }

    return {
        src: SpecialCoin,
        animationDefault: true,
        className: 'winner'
    }
}

export function winningImage(theme: string = 'default') {
    if (theme !== 'default') {
        return winningDog()
    }
    const rand = Math.floor((Math.random() * 3))
    switch (rand) {
        case 1:
            return {
                src: WinnerOne,
                animationDefault: true,
                className: 'winner'
            }
        case 2:
            return {
                src: WinnerTwo,
                animationDefault: true,
                className: 'winnerNoneGreen'

            }
        default:
            return {
                src: WinnerThree,
                className: 'winnerNoneGreen',
                animationDefault: true
            }
    }
}

export function winningDog() {
    const rand = Math.floor((Math.random() * 3))
    switch (rand) {
        case 1:
            return {
                src: DogWinnerOne,
                animationDefault: true,
                className: 'winnerLightGreen'
            }
        case 2:
            return {
                src: DogWinnerTwo,
                animationDefault: true,
                className: 'winnerLightGreen'

            }
        default:
            return {
                src: DogWinnerThree,
                className: 'winnerAqua',
                animationDefault: true
            }
    }
}

export function losingImage() {
    const rand = Math.floor((Math.random() * 3))
    console.log(rand)

    switch (rand) {
        case 1:
            return {
                src: LoserOne,
                animationDefault: true
            }
        case 2:
            return {
                src: LoserTwo,
                animationDefault: true
            }
        default:
            return {
                src: LoserThree,
                animationDefault: true
            }
    }
}

export function getThemePack(theme: string = 'default') {
    const slotImage = (theme === 'default') ? DefaultSlotImage : DogSlot

    return {
        slotImage
    }

}
