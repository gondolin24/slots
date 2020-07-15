export function getMultiplier(bump: number) {
    const randomNum = (Math.random()) * .65
    return randomNum
}

export function getWinningAmount(winCondition: boolean, multiplier: number, betAmount: number) {
    if (!winCondition) return 0

    return Math.ceil((betAmount) * multiplier)

}
