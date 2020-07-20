import {SettingsData} from "./SettingsData";
import {StoreMetaData} from "./store/StoreMetaData";

export class AppMetaData {
    bankBalance: number
    rewardMultiplier: number
    specialCoins: number
    settingsData: SettingsData
    storeMetaData: StoreMetaData

    constructor(bankBalance: number, rewardMultiplier: number, specialCoins: number, settingsData: SettingsData,
                storeMetaData: StoreMetaData) {
        this.bankBalance = bankBalance
        this.specialCoins = specialCoins
        this.rewardMultiplier = rewardMultiplier
        this.settingsData = settingsData
        this.storeMetaData = storeMetaData
    }

    toJson() {
        return {
            metaData: {
                specialCoins: this.specialCoins,
                bankBalance: this.bankBalance,
                rewardMultiplier: this.rewardMultiplier,
                settingsData: this.settingsData.toJson(),
                storeMetaData: this.storeMetaData.toJson()
            }
        }
    }

    getMultiplierBonusAmount(){
        return this.storeMetaData.redeemedMultiplierBonus
    }


    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        const rewardMultiplier = schema.rewardMultiplier || 0
        const specialCoins = schema.specialCoins || 0
        const settingsData = SettingsData.fromJson(schema.settingsData)
        const storeMetaData = StoreMetaData.fromJson(schema.storeMetaData)
        return new AppMetaData(bankBalance, rewardMultiplier, specialCoins, settingsData, storeMetaData)
    }
}
