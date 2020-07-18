export class SettingsData {
    vibration: boolean

    constructor(vibration: boolean) {
        this.vibration = vibration
    }

    toJson() {
        return {
            vibration: this.vibration
        }
    }

    static fromJson(schema: any) {
        const vibration = (schema.vibration === null || schema.vibration === undefined) ? true : schema.vibration
        return new SettingsData(vibration)
    }
}

