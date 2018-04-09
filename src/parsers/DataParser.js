
export class DataParser {
    parse(node) {
        const { condition, data } = node;
        return {
            condition,
            options: { data }
        };
    }
}
