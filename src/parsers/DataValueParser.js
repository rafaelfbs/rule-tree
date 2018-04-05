
export class DataValueParser {
    parse(node) {
        const { condition, data, value } = node;
        return {
            condition,
            options: {
                data,
                value,
            }
        };
    }
}
