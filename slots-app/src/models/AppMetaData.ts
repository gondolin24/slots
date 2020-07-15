export class AppMetaData {
    bankBalance: number
    rewardMultiplier: number

    constructor(bankBalance: number, rewardMultiplier: number) {
        this.bankBalance = bankBalance
        this.rewardMultiplier = rewardMultiplier
    }

    toJson() {
        return {
            metaData: {
                bankBalance: this.bankBalance,
                rewardMultiplier: this.rewardMultiplier
            }
        }
    }

    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        const rewardMultiplier = schema.rewardMultiplier || 0

        return new AppMetaData(bankBalance, rewardMultiplier)
    }
}
