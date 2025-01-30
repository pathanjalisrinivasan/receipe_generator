class Cache {
    constructor(ttl = 3600000) { // Default TTL: 1 hour
        this.cache = new Map();
        this.ttl = ttl;
    }

    set(key, value) {
        const item = {
            value,
            timestamp: Date.now()
        };
        this.cache.set(key, item);
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        const isExpired = Date.now() - item.timestamp > this.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear() {
        this.cache.clear();
    }
}

module.exports = Cache; 