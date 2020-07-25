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
import * as DogLoserOne from '../../lottie-files/themes/Dogs/loser/losing-one.json'
import * as DogLoserTwo from '../../lottie-files/themes/Dogs/loser/losing-two.json'
import * as DogLoserThree from '../../lottie-files/themes/Dogs/loser/losing-three.json'
import * as CatSpecialCoin from '../../lottie-files/themes/Cats/specialCoins/Winner.json'
import * as CatWinnerOne from '../../lottie-files/themes/Cats/winner/winner-one.json'
import * as CatWinnerTwo from '../../lottie-files/themes/Cats/winner/winner-two.json'
import * as CatWinnerThree from '../../lottie-files/themes/Cats/winner/winner-three.json'
import * as CatLoserOne from '../../lottie-files/themes/Cats/loser/losing-one.json'
import * as CatLoserTwo from '../../lottie-files/themes/Cats/loser/losing-two.json'
import * as CatLoserThree from '../../lottie-files/themes/Cats/loser/losing-three.json'
import * as CatSlot from '../../lottie-files/themes/Cats/slot/SlotImage.json'


export function jackPotLottie() {
    return {
        src: JackPot,
        animationDefault: true,
        className: 'winner'
    }
}

export function specialCoinLottie(theme: string = 'default') {
    switch (theme) {
        case 'dogs':
            return {
                src: DogSpecialCoin,
                animationDefault: true,
                className: 'winner'
            }

        case 'cats':
            return {
                src: CatSpecialCoin,
                animationDefault: true,
                className: 'winner'
            }
        default:
            return {
                src: SpecialCoin,
                animationDefault: true,
                className: 'winner'
            }
    }

}

export function winningDefault() {

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

export function winningImage(theme: string = 'default') {

        switch (theme) {
            case 'dogs':
                return winningDog()
            case 'cats':
                return winningCat()
            default:
                return winningDefault()
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

export function winningCat() {
    const rand = Math.floor((Math.random() * 3))
    switch (rand) {
        case 1:
            return {
                src: CatWinnerOne,
                animationDefault: true,
                className: 'winnerLemon'
            }
        case 2:
            return {
                src: CatWinnerTwo,
                animationDefault: true,
                className: 'winnerLightGreen'

            }
        default:
            return {
                src: CatWinnerThree,
                className: 'winnerAqua',
                animationDefault: true
            }
    }
}

export function losingCat() {
    const rand = Math.floor((Math.random() * 3))

    switch (rand) {
        case 1:
            return {
                src: CatLoserOne,
                animationDefault: true
            }
        case 2:
            return {
                src: CatLoserTwo,
                animationDefault: true
            }
        default:
            return {
                src: CatLoserThree,
                animationDefault: true
            }
    }
}

export function losingDefault() {
    const rand = Math.floor((Math.random() * 3))

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

export function losingDog() {
    const rand = Math.floor((Math.random() * 3))

    switch (rand) {
        case 1:
            return {
                src: DogLoserOne,
                animationDefault: true
            }
        case 2:
            return {
                src: DogLoserTwo,
                animationDefault: true
            }
        default:
            return {
                src: DogLoserThree,
                animationDefault: true
            }
    }
}

export function losingImage(theme: string = 'default') {

    switch (theme) {
        case 'dogs':
           return losingDog()
        case 'cats':
            return losingCat()
        default:
            return losingDefault()
    }
}

export function getThemePack(theme: string = 'default') {
    let slotImage: any = DefaultSlotImage

    switch (theme) {
        case 'dogs':
            slotImage = DogSlot
            break;
        case 'cats':
            slotImage = CatSlot
            break
    }

    return {
        slotImage
    }
}
