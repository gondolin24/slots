export function getMultiplierBonusPrice(timesRedeemed: number = 3) {
    const basePrice = 20
    const power = timesRedeemed * .15
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}
