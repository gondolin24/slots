import {SettingsData} from "./SettingsData";

export class AppMetaData {
    bankBalance: number
    rewardMultiplier: number
    specialCoins: number
    settingsData: SettingsData

    constructor(bankBalance: number, rewardMultiplier: number, specialCoins: number, settingsData: SettingsData) {
        this.bankBalance = bankBalance
        this.specialCoins = specialCoins
        this.rewardMultiplier = rewardMultiplier
        this.settingsData = settingsData
    }

    toJson() {
        console.log("yehhh")
        return {
            metaData: {
                specialCoins: this.specialCoins,
                bankBalance: this.bankBalance,
                rewardMultiplier: this.rewardMultiplier,
                settingsData: this.settingsData.toJson()
            }
        }
    }

    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        const rewardMultiplier = schema.rewardMultiplier || 0
        const specialCoins = schema.specialCoins || 0
        const settingsData = SettingsData.fromJson(schema.settingsData)
        return new AppMetaData(bankBalance, rewardMultiplier, specialCoins, settingsData)
    }
}
