export class StorageProvider {
    /**
     * @param {string} item
     * @returns {void}
     */
    save(item) {
        throw new Error("Method not implemented.");
    }

    /**
     * @param {Object} item
     * @returns {void}
     */
    updateStatus(item) {
        throw new Error("Method not implemented.");
    }

    /**
     * @returns {string|null}
     */
    getAll() {
        throw new Error("Method not implemented.");
    }

    /**
     * @param {Array} items
     * @returns {void}
     */
    updateTable(items = []) {
        throw new Error("Method not implemented.");
    }

    /**
     * @param {Object} item
     * @returns {void}
     */
    removeOne(item) {
        throw new Error("Method not implemented.");
    }

    /**
     * @param {Object} item
     * @returns {void}
     */
    updateItem(item) {
        throw new Error("Method not implemented.");
    }
}