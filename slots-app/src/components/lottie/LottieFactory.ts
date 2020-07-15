import * as WinnerOne from '../../lottie-files/winner/winner-one.json'
import * as WinnerTwo from '../../lottie-files/winner/winner-two.json'
import * as WinnerThree from '../../lottie-files/winner/winner-three.json'

import * as LoserOne from '../../lottie-files/loser/loser-one.json'
import * as LoserTwo from '../../lottie-files/loser/loser-two.json'
import * as LoserThree from '../../lottie-files/loser/loser-three.json'

export function winningImage() {
    const rand = Math.floor( (Math.random()*3))
    console.log(rand)
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

export function losingImage() {
    const rand = Math.floor( (Math.random()*3))
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
