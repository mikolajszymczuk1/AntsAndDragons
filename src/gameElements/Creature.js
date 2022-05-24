// Base creature class
class Creature {
    constructor(health) {
        this.health = health;
    }

    // Return class name
    getClassName() {
        return this.constructor.name;
    }
}

export default Creature;
