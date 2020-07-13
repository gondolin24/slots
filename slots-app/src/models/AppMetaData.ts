export class AppMetaData {
    bankBalance: number

    constructor(bankBalance: number) {
        this.bankBalance = bankBalance
    }

    toJson() {
        return {
            metaData: {
                bankBalance: this.bankBalance
            }
        }
    }

    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        return new AppMetaData(bankBalance)
    }
}
