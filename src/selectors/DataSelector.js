
const SELECTOR_REGEX = /(([.#]?)(\w+))/g;

export class DataSelector {
    select(data, selector) {
        if (!selector) {
            return data;
        }

        const matches = this.getMatches(selector);
        const parentMatch = ['root'];
        
        return matches.reduce((data, match) => {
            const [_, cmd, accessorOrEmpty, path] = match;
            const accessor = accessorOrEmpty || '.';
            const absolutePath = parentMatch.join('');
            
            parentMatch.push(`${accessor}${path}`);
            
            if (this.isPropertyAccessor(accessor)) return this.getProperty(data, path, absolutePath);
            if (this.isMethodAccessor(accessor)) return this.getMethod(data, path, absolutePath);
            
            throw new SyntaxError(`Wrong selector syntax in "${cmd}`);
        }, data);
    }
    
    isPropertyAccessor(accessor) {
        return accessor === '' || accessor === '.';
    }
    
    isMethodAccessor(accessor) {
        return accessor === '#';
    }
    
    getProperty(data, path, absolutePath) {
        if (!(path in data)) throw new SyntaxError(`No property "${path}" in data (${absolutePath})`);
        return data[path];
    }
    
    getMethod(data, path, absolutePath) {
        if (!(path in data)) throw new SyntaxError(`No method "${path}" in data (${absolutePath})`);
        if (typeof data[path] !== 'function') throw new SyntaxError(`Property "${path}" is not a function (${absolutePath})`);
        return data[path]();
    }
    
    getMatches(selector) {
        const matches = [];
        let match = null;
        
        while ((match = SELECTOR_REGEX.exec(selector)) !== null) {
            matches.push(match);
        }
        
        return matches;
    }
}
