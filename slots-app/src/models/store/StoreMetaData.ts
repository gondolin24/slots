export class StoreMetaData {
    redeemedMultiplierBonus: number
    redeemedWinChance: number

    constructor(redeemedMultiplierBonus: number = 0, redeemedWinChance: number = 0) {
        this.redeemedWinChance = redeemedWinChance
        this.redeemedMultiplierBonus = redeemedMultiplierBonus
    }

    toJson() {
        return {
            redeemedMultiplierBonus: this.redeemedMultiplierBonus,
            redeemedWinChance: this.redeemedWinChance
        }
    }

    static fromJson(schema: any) {
        if ((schema === undefined)) {
            return new StoreMetaData()
        }
        const redeemedMultiplierBonus = schema.redeemedMultiplierBonus || 0

        const redeemedWinChance = schema.redeemedWinChance || 0
        return new StoreMetaData(redeemedMultiplierBonus, redeemedWinChance)
    }
}
