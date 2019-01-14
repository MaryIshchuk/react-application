function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export const sattelitesService = {
    sattelites: JSON.parse(sessionStorage.getItem('sattelites') || '[]'),

    async getAll() {
        return clone(this.sattelites);
    },

    async update(sattelite) {
        this.sattelites = this.sattelites.map(x => x.id === sattelite.id ? clone(sattelite) : x);
        sessionStorage.setItem('sattelites', JSON.stringify(this.sattelites));
    },

    async add(sattelite) {
        this.sattelites.push(clone(sattelite));
        sessionStorage.setItem('sattelites', JSON.stringify(this.sattelites));
    },

    async delete(sattelite) {
        this.sattelites = this.sattelites.filter(x => x.id !== sattelite.id);
        sessionStorage.setItem('sattelites', JSON.stringify(this.sattelites));
    },
}