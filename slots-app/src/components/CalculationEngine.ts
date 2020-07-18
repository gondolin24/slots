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

    return result1 === result2 && result2 === result3 && result3===result4;
}

export function didSpinWin() {
    const random = Math.floor(Math.random() * 100)
    return random < 45
}

export function specialCoinEarned() {
    const result1 = Math.floor(Math.random() * 15)
    const result2 = Math.floor(Math.random() * 15)
    return (result2 === result1)
}
