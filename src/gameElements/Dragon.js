import Base from "./Base";

// Dragon character class
class Dragon extends Base {
    constructor(health, name) {
        super(name);
        this.health = health;
    }
}

export default Dragon;
