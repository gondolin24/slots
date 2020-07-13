export class BetService {

    constructor(options: any) {

    }

    getSpinResults() {
        const random = Math.floor(Math.random() * 100)
        return random < 54
    }

    getCashAmount() {

    }

}
