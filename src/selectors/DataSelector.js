
export class DataSelector {
    constructor(parser) {
        this.parser = parser;
    }

    select(data, selector) {
        if (!selector) return data;

        const node = this.parser.parse(selector);

        return node.entries.reduce((data, entry) => {
            if (entry.type === 'property') return this.selectProperty(data, entry, selector);
            if (entry.type === 'method') return this.selectMethod(data, entry, selector);
            throw new SyntaxError(`Wrong selector syntax in "${selector.substring(entry.start, entry.end)}"`);
        }, data);
    }

    selectProperty(data, entry, selector) {
        if (entry.modifier && entry.modifier.type === 'flat-map-modifier') {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${selector.substring(entry.start, entry.end)})`);
            }

            return this.reduceData(data, entry, selector, this.getProperty.bind(this));
        }

        return this.getProperty(data, entry, selector);
    }

    getProperty(data, entry, selector) {
        const { value: path } = entry;

        if (path in data) {
            return data[path];
        }

        throw new SyntaxError(`No property "${path}" in data (${selector.substring(entry.start, entry.end)})`);
    }

    selectMethod(data, entry, selector) {
        if (entry.modifier && entry.modifier.type === 'flat-map-modifier') {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${selector.substring(entry.start, entry.end)})`);
            }

            return this.reduceData(data, entry, selector, this.getMethod.bind(this));
        }

        return this.getMethod(data, entry, selector);
    }

    getMethod(data, entry, selector) {
        const { value: path } = entry;

        if (path in data) {
            if (typeof data[path] === 'function') {
                return data[path]();
            }

            throw new SyntaxError(`Property "${path}" is not a function (${selector.substring(entry.start, entry.end)})`);
        }

        throw new SyntaxError(`No method "${path}" in data (${selector.substring(entry.start, entry.end)})`);
    }

    reduceData(data, entry, selector, reducer) {
        return data.reduce((arr, item) => arr.concat(reducer(item, entry, selector)), []);
    }
}
