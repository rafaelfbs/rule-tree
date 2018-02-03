import { RuleTreeBuilder } from './RuleTreeBuilder';
import { AndValidator } from './validators/AndValidator';
import { EqualsValidator } from './validators/EqualsValidator';
import { ExistsValidator } from './validators/ExistsValidator';
import { GreaterThanEqualsValidator } from './validators/GreaterThanEqualsValidator';
import { GreaterThanValidator } from './validators/GreaterThanValidator';
import { InValidator } from './validators/InValidator';
import { LesserThanEqualsValidator } from './validators/LesserThanEqualsValidator';
import { LesserThanValidator } from './validators/LesserThanValidator';
import { NotValidator } from './validators/NotValidator';
import { OrValidator } from './validators/OrValidator';
import { SomeValidator } from './validators/SomeValidator';

export const treeBuilder = new RuleTreeBuilder();

treeBuilder
    .addCondition('and', tree => new AndValidator(tree))
    .addCondition('equals', tree => new EqualsValidator(tree.dataSelector))
    .addCondition('exists', tree => new ExistsValidator(tree.dataSelector))
    .addCondition('greater-than-equals', tree => new GreaterThanEqualsValidator(tree.dataSelector))
    .addCondition('greater-than', tree => new GreaterThanValidator(tree.dataSelector))
    .addCondition('in', tree => new InValidator(tree.dataSelector))
    .addCondition('lesser-than-equals', tree => new LesserThanEqualsValidator(tree.dataSelector))
    .addCondition('lesser-than', tree => new LesserThanValidator(tree.dataSelector))
    .addCondition('not', tree => new NotValidator(tree))
    .addCondition('or', tree => new OrValidator(tree))
    .addCondition('some', tree => new SomeValidator(tree));

export function createRuleTree(schema) {
    return treeBuilder.build(schema);
}
