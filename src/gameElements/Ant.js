import Base from "./Base";

// Ant character class
class Ant extends Base {
    constructor(health, name) {
        super(name);
        this.health = health;
    }
}

export default Ant;
