
# Rule Tree

A simpler structure for complex validations

### Usage

```javascript
import { createRuleTree } from 'rule-tree';

const tree = createRuleTree({
    condition: 'and',
    rules: [
        { condition: 'equals', data: 'user#getStatus', value: 'active' },
        { condition: 'greater-than', data: 'user.friends.length', value: 1 }
    ]
});

tree.validate({
    id: 1,
    user: {
        id: 1,
        name: 'John',
        getStatus: () => 'active',
        friends: [2, 3]
    }
});
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

##### Custom Conditions

```javascript
import { treeBuilder } from 'rule-tree';

treeBuilder
    .addCondition('is-john', (tree) => (data, rule) => data === 'John'),
    .addCondition('is-fred', (tree) => ({
        validate(data, rule) {
            const selected = tree.dataSelector.select(data, rule.options.path);
            return selected === 'Fred';
        }
    }));

const tree = treeBuilder.build(schema);
```

See validators for more examples

