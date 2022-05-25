// Base class with basic game elements functionality
class Base {
    constructor(name) {
        this._name = name;
    }

    // Return class name
    getName() {
        return this._name
    }
}

export default Base;
