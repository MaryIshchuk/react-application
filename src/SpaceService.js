function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export const spaceService = {
    items: JSON.parse(sessionStorage.getItem('items') || '[]'),

    async getAll() {
        return clone(this.items);
    },

    async update(item) {
        this.items = this.items.map(x => x.id === item.id ? clone(item) : x);
        sessionStorage.setItem('items', JSON.stringify(this.items));
    },

    async add(item) {
        debugger
        this.items.push(clone(item));
        sessionStorage.setItem('items', JSON.stringify(this.items));
    },
}