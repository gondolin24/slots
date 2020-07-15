export class AppMetaData {
    bankBalance: number
    rewardMultiplier: number
    specialCoins: number

    constructor(bankBalance: number, rewardMultiplier: number, specialCoins: number) {
        this.bankBalance = bankBalance
        this.specialCoins = specialCoins
        this.rewardMultiplier = rewardMultiplier
    }

    toJson() {
        return {
            metaData: {
                specialCoins : this.specialCoins,
                bankBalance: this.bankBalance,
                rewardMultiplier: this.rewardMultiplier
            }
        }
    }

    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        const rewardMultiplier = schema.rewardMultiplier || 0
        const specialCoins = schema.specialCoins || 0
        return new AppMetaData(bankBalance, rewardMultiplier,specialCoins)
    }
}
