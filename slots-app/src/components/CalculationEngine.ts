import {BASE_WIN_PERCENT} from "../SlotConfig";

export function getMultiplier(bump: number, isJackPot: boolean) {
    const randomNum = (Math.random()) * .75
    const random = (Math.random()) * 2
    const jackPot = (isJackPot) ? 15 : 0
    return (randomNum + random + bump + jackPot)
}

export function getWinningAmount(winCondition: boolean, multiplier: number, betAmount: number) {
    if (!winCondition) return 0
    return Math.ceil((betAmount) * multiplier)
}

export function isJackPot(): boolean {
    const result1 = Math.floor(Math.random() * 5)
    const result2 = Math.floor(Math.random() * 5)
    const result3 = Math.floor(Math.random() * 5)
    const result4 = Math.floor(Math.random() * 5)

    return result1 === result2 && result2 === result3 && result3 === result4;
}


export function getMaxBet(bankBalance: number) {
    if (bankBalance <= 1000000000) {
        return 200000
    }

    const newMax = Math.floor(0.0006 * bankBalance)
    let power = 0
    while (newMax >= Math.pow(10, power)) {
        power += 1
    }
    return Math.pow(10, power)
}

export function didSpinWin(bonus: number = 0) {
    const random = Math.floor((Math.random()) * 100)
    return random <= (BASE_WIN_PERCENT + (100 * bonus))
}

export function specialCoinEarned(bumpProb: number = 0) {
    return true
    // const result1 = Math.floor(Math.random() * 15)
    // const result2 = Math.floor(Math.random() * 15)
    // const result = (result2 === result1)
    // if (result) {
    //     return true
    // } else {
    //     //generate random number
    //     const randomNumber = Math.random()
    //     return randomNumber < bumpProb
    // }
}
