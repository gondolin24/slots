export class SettingsData {
    vibration: boolean
    popups: boolean

    constructor(vibration: boolean = true, popups: boolean = true) {
        this.vibration = vibration
        this.popups = popups
    }

    toJson() {
        return {
            vibration: this.vibration,
            popups: this.popups
        }
    }

    static fromJson(schema: any) {
        if (schema === undefined) {
            return new SettingsData()
        }
        const vibration = (schema.vibration === null || schema.vibration === undefined) ? true : schema.vibration
        const popups = (schema.popups === null || schema.popups === undefined) ? true : schema.popups

        return new SettingsData(vibration, popups)
    }
}

