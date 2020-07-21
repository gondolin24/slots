export class StoreMetaData {
    redeemedMultiplierBonus: number
    redeemedWinChance: number
    redeemedSpecialCoins: number
    redeemedGodsCoin: number

    constructor(redeemedMultiplierBonus: number = 0, redeemedWinChance: number = 0, redeemedSpecialCoins: number = 0,
                redeemedGodsCoin: number = 0) {
        this.redeemedWinChance = redeemedWinChance
        this.redeemedMultiplierBonus = redeemedMultiplierBonus
        this.redeemedSpecialCoins = redeemedSpecialCoins
        this.redeemedGodsCoin = redeemedGodsCoin
    }

    toJson() {
        return {
            redeemedMultiplierBonus: this.redeemedMultiplierBonus,
            redeemedWinChance: this.redeemedWinChance,
            redeemedSpecialCoins: this.redeemedSpecialCoins,
            redeemedGodsCoin: this.redeemedGodsCoin
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
        return new StoreMetaData(redeemedMultiplierBonus, redeemedWinChance, redeemedSpecialCoins, redeemedGodsCoin)
    }
}
