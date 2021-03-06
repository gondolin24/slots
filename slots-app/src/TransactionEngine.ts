export function calculateMultiplierBonusPrice(timesRedeemed: number = 0) {
    const basePrice = 20
    const power = timesRedeemed * .15
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

export function calculateMultiplierBonus(timesRedeemed: number = 0) {
    let num = 0
    for (let i = 0; i < timesRedeemed; i++) {
        num = num + 0.40
    }
    return num
}

export function calculateWinBonusPrice(timesRedeemed: number = 0) {
    const basePrice = 20
    const power = timesRedeemed * .15
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

export function calculateWinBonus(timesRedeemed: number = 0) {
    let num = 0
    for (let i = 0; i < timesRedeemed; i++) {
        num = num + 0.03
    }
    return num
}

export function calculateGodsBonus(timesRedeemed: number = 0) {
    let num = 0
    for (let i = 0; i < timesRedeemed; i++) {
        num = num + 0.04
    }
    return num
}

export function calculateGodsBonusPrice(timesRedeemed: number = 0) {
    const basePrice = 30
    const power = timesRedeemed * .09
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

export function calculateRangePrice(timesRedeemed: number = 0) {
    const basePrice = 30
    const power = (timesRedeemed - 1) * .003
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

export function calculateCoinFromPercentage(availableMoney: number, timesRedeemed: number) {

    let count = 1
    let amount = calculateSpecialCoinPrice(timesRedeemed + count)
    while (amount < availableMoney) {
        amount = calculateSpecialCoinPrice(timesRedeemed + (count))
        count += 1
    }
    return count

}

export function calculateSpecialCoinPrice(timesRedeemed: number = 0) {
    const basePrice = 200000
    const power = timesRedeemed * .0001
    return Math.ceil(Math.pow(basePrice, power) * basePrice)
}

