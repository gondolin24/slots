export function getMultiplierBonusPrice(timesRedeemed: number = 0) {
    const basePrice = 20
    const power = timesRedeemed * .15
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

export function calculateMultiplierBonus(timesRedeemed: number = 0) {
    let num = 0
    for (let i = 0; i < timesRedeemed; i++) {
        num = num + 0.25
    }
    return num
}
