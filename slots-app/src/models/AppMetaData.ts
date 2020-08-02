import {SettingsData} from "./SettingsData";
import {StoreMetaData} from "./store/StoreMetaData";

export class AppMetaData {
    bankBalance: number
    rewardMultiplier: number
    specialCoins: number
    settingsData: SettingsData
    storeMetaData: StoreMetaData
    theme: string

    constructor(bankBalance: number, rewardMultiplier: number, specialCoins: number, settingsData: SettingsData,
                storeMetaData: StoreMetaData, theme: string = 'default') {
        this.bankBalance = bankBalance
        this.specialCoins = specialCoins
        this.rewardMultiplier = rewardMultiplier
        this.settingsData = settingsData
        this.storeMetaData = storeMetaData
        this.theme = theme
    }

    toJson() {
        return {
            metaData: {
                specialCoins: this.specialCoins,
                bankBalance: this.bankBalance,
                rewardMultiplier: this.rewardMultiplier,
                settingsData: this.settingsData.toJson(),
                storeMetaData: this.storeMetaData.toJson(),
                theme: this.theme
            }
        }
    }

    getMultiplierBonusAmount() {
        return this.storeMetaData.redeemedMultiplierBonus
    }

    getWinBonusAmount() {
        return this.storeMetaData.redeemedWinChance
    }

    getSpecialCoinRedeemed() {
        return this.storeMetaData.redeemedSpecialCoins
    }

    getGodsCoinRedeemed() {
        return this.storeMetaData.redeemedGodsCoin
    }
    getRangeRedeemed() {
        return this.storeMetaData.redeemedRange
    }
    static fromJson(schema: any) {
        const bankBalance = schema.bankBalance
        const rewardMultiplier = schema.rewardMultiplier || 0
        const specialCoins = schema.specialCoins || 0
        const settingsData = SettingsData.fromJson(schema.settingsData)
        const storeMetaData = StoreMetaData.fromJson(schema.storeMetaData)
        const theme = schema.theme || 'default'
        return new AppMetaData(bankBalance, rewardMultiplier, specialCoins, settingsData, storeMetaData, theme)
    }
}
