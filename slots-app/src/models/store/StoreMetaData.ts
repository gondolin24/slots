export class StoreMetaData {
    redeemedMultiplierBonus: number
    redeemedWinChance: number
    redeemedSpecialCoins: number
    redeemedGodsCoin: number
    redeemedRange: number

    constructor(redeemedMultiplierBonus: number = 0, redeemedWinChance: number = 0, redeemedSpecialCoins: number = 0,
                redeemedGodsCoin: number = 0, redeemedRange: number = 1) {
        this.redeemedWinChance = redeemedWinChance
        this.redeemedMultiplierBonus = redeemedMultiplierBonus
        this.redeemedSpecialCoins = redeemedSpecialCoins
        this.redeemedGodsCoin = redeemedGodsCoin
        this.redeemedRange = redeemedRange
    }

    toJson() {
        return {
            redeemedMultiplierBonus: this.redeemedMultiplierBonus,
            redeemedWinChance: this.redeemedWinChance,
            redeemedSpecialCoins: this.redeemedSpecialCoins,
            redeemedGodsCoin: this.redeemedGodsCoin,
            redeemedRange: this.redeemedRange
        }
    }

    static fromJson(schema: any) {
        if ((schema === undefined)) {
            return new StoreMetaData()
        }
        const redeemedMultiplierBonus = schema.redeemedMultiplierBonus || 0

        const redeemedWinChance = schema.redeemedWinChance || 0
        const redeemedSpecialCoins = schema.redeemedSpecialCoins || 0
        const redeemedGodsCoin = schema.redeemedGodsCoin || 0
        const redeemedRange = schema.redeemedRange || 1
        return new StoreMetaData(redeemedMultiplierBonus, redeemedWinChance, redeemedSpecialCoins, redeemedGodsCoin, redeemedRange)
    }
}
