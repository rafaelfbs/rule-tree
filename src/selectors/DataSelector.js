
const SELECTOR_REGEX = /(([.#]?)(\w+)(\[])?)/g;

export class DataSelector {
    select(data, selector) {
        if (!selector) {
            return data;
        }

        const matches = this.getMatches(selector);
        const parentMatch = ['root'];
        
        return matches.reduce((data, match) => {
            const [_, cmd, accessorOrEmpty, path, modifier] = match;
            const accessor = accessorOrEmpty || '.';
            const absolutePath = parentMatch.join('');
            
            parentMatch.push(`${accessor}${path}${modifier || ''}`);
            
            if (this.isPropertyAccessor(accessor)) return this.getProperty(data, path, absolutePath, modifier);
            if (this.isMethodAccessor(accessor)) return this.getMethod(data, path, absolutePath, modifier);
            
            throw new SyntaxError(`Wrong selector syntax in "${cmd}`);
        }, data);
    }
    
    isPropertyAccessor(accessor) {
        return accessor === '' || accessor === '.';
    }
    
    isMethodAccessor(accessor) {
        return accessor === '#';
    }

    isFlatMapModifier(modifier) {
        return modifier === '[]'
    }
    
    getProperty(data, path, absolutePath, modifier) {
        if (this.isFlatMapModifier(modifier)) {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${absolutePath})`);
            }

            return this.reduceData(data, path, absolutePath, this.getProperty.bind(this));
        }
        if (!(path in data)) throw new SyntaxError(`No property "${path}" in data (${absolutePath})`);
        return data[path];
    }
    
    getMethod(data, path, absolutePath, modifier) {
        if (this.isFlatMapModifier(modifier)) {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${absolutePath})`);
            }

            return this.reduceData(data, path, absolutePath, this.getMethod.bind(this));
        }
        if (!(path in data)) throw new SyntaxError(`No method "${path}" in data (${absolutePath})`);
        if (typeof data[path] !== 'function') throw new SyntaxError(`Property "${path}" is not a function (${absolutePath})`);
        return data[path]();
    }

    reduceData(data, path, absolutePath, reducer) {
        return data.reduce((arr, item) => arr.concat(reducer(item, path, absolutePath)), []);
    }
    
    getMatches(selector) {
        const matches = [];
        let match;
        
        while ((match = SELECTOR_REGEX.exec(selector)) !== null) {
            matches.push(match);
        }
        
        return matches;
    }
}
