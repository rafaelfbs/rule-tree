
# Rule Tree

A simpler structure for complex validations

### Usage

```javascript
import { createRuleTree } from 'rule-tree';

const activeUserHasManyFriends = createRuleTree({
    condition: 'and',
    rules: [
        { condition: 'equals', data: '#getStatus', value: 'active' },
        { condition: 'greater-than', data: '.friends.length', value: 1 }
    ]
});

const user = {
    id: 1,
    name: 'John',
    getStatus: () => 'active',
    friends: [2, 3]
};

activeUserHasManyFriends.validate(user);
```

### Conditions

##### Built-in Conditions

* and
* equals
* every
* exists
* greater-than-equals
* greater-than
* in
* lesser-than-equals
* lesser-than
* not
* or
* some
* sum-matches-rule

##### Custom Conditions

```javascript
import { treeBuilder, DataParserFactory, DataValueParserFactory } from 'rule-tree';

treeBuilder
    .addCondition('is-john', DataParserFactory, (tree) => (data, rule) => data === 'John'),
    .addCondition('is-fred', DataValueParserFactory, (tree) => ({
        validate(data, rule) {
            const selected = tree.dataSelector.select(data, rule.options.value);
            return selected === 'Fred';
        }
    }));

const tree = treeBuilder.build(schema);
```

See validators for more examples
