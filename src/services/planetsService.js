function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export const planetsService = {
    planets: JSON.parse(sessionStorage.getItem('planets') || '[]'),

    async getAll() {
        return clone(this.planets);
    },

    async update(planet) {
        this.planets = this.planets.map(x => x.id === planet.id ? clone(planet) : x);
        sessionStorage.setItem('planets', JSON.stringify(this.planets));
    },

    async add(planet) {
        this.planets.push(clone(planet));
        sessionStorage.setItem('planets', JSON.stringify(this.planets));
    },

    async delete(planet) {
        this.planets = this.planets.filter(x => x.id !== planet.id);
        sessionStorage.setItem('planets', JSON.stringify(this.planets));
    },
}