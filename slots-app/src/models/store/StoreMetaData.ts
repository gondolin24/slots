export class StoreMetaData {
    redeemedMultiplierBonus: number

    constructor(redeemedMultiplierBonus: number) {
        this.redeemedMultiplierBonus = redeemedMultiplierBonus
    }

    toJson() {
        return {
            redeemedMultiplierBonus: this.redeemedMultiplierBonus
        }
    }

    static fromJson(schema: any) {
        const redeemedMultiplierBonus = schema.redeemedMultiplierBonus || 0
        return new StoreMetaData(redeemedMultiplierBonus)
    }
}
