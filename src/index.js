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
import { SumMatchesRuleValidator } from "./validators/SumMatchesRuleValidator";
import { RulesParser } from "./parsers/RulesParser";
import { RuleParser } from "./parsers/RuleParser";
import { DataRuleParser } from "./parsers/DataRuleParser";
import { DataValueParser } from "./parsers/DataValueParser";
import { ListFilterDataRuleParser } from "./parsers/ListFilterDataRuleParser";
import { EveryValidator } from "./validators/EveryValidator";

export const treeBuilder = new RuleTreeBuilder();

export const AND_CONDITION = 'and';
export const EQUALS_CONDITION = 'equals';
export const EXISTS_CONDITION = 'exists';
export const GREATER_THAN_EQUALS_CONDITION = 'greater-than-equals';
export const GREATER_THAN_CONDITION = 'greater-than';
export const IN_CONDITION = 'in';
export const LESSER_THAN_EQUALS_CONDITION = 'lesser-than-equals';
export const LESSER_THAN_CONDITION = 'lesser-than';
export const NOT_CONDITION = 'not';
export const OR_CONDITION = 'or';
export const SOME_CONDITION = 'some';
export const EVERY_CONDITION = 'every';
export const SUM_MATCHES_RULE_CONDITION = 'sum-matches-rule';

export const DataRuleParserFactory = tree => new DataRuleParser(tree);
export const DataValueParserFactory = () => new DataValueParser();
export const ListFilterDataRuleParserFactory = tree => new ListFilterDataRuleParser(tree);
export const RuleParserFactory = tree => new RuleParser(tree);
export const RulesParserFactory = tree => new RulesParser(tree);

export const AndValidatorFactory = tree => new AndValidator(tree);
export const EqualsValidatorFactory = tree => new EqualsValidator(tree.dataSelector);
export const ExistsValidatorFactory = tree => new ExistsValidator(tree.dataSelector);
export const GreaterThanEqualsValidatorFactory = tree => new GreaterThanEqualsValidator(tree.dataSelector);
export const GreaterThanValidatorFactory = tree => new GreaterThanValidator(tree.dataSelector);
export const InValidatorFactory = tree => new InValidator(tree.dataSelector);
export const LesserThanEqualsValidatorFactory = tree => new LesserThanEqualsValidator(tree.dataSelector);
export const LesserThanValidatorFactory = tree => new LesserThanValidator(tree.dataSelector);
export const NotValidatorFactory = tree => new NotValidator(tree);
export const OrValidatorFactory = tree => new OrValidator(tree);
export const SomeValidatorFactory = tree => new SomeValidator(tree);
export const EveryValidatorFactory = tree => new EveryValidator(tree);
export const SumMatchesRuleValidatorFactory = tree => new SumMatchesRuleValidator(tree);

treeBuilder
    .addCondition(AND_CONDITION, RulesParserFactory, AndValidatorFactory)
    .addCondition(EQUALS_CONDITION, DataValueParserFactory, EqualsValidatorFactory)
    .addCondition(EXISTS_CONDITION, DataValueParserFactory, ExistsValidatorFactory)
    .addCondition(GREATER_THAN_EQUALS_CONDITION, DataValueParserFactory, GreaterThanEqualsValidatorFactory)
    .addCondition(GREATER_THAN_CONDITION, DataValueParserFactory, GreaterThanValidatorFactory)
    .addCondition(IN_CONDITION, DataValueParserFactory, InValidatorFactory)
    .addCondition(LESSER_THAN_EQUALS_CONDITION, DataValueParserFactory, LesserThanEqualsValidatorFactory)
    .addCondition(LESSER_THAN_CONDITION, DataValueParserFactory, LesserThanValidatorFactory)
    .addCondition(NOT_CONDITION, RuleParserFactory, NotValidatorFactory)
    .addCondition(OR_CONDITION, RulesParserFactory, OrValidatorFactory)
    .addCondition(SOME_CONDITION, DataRuleParserFactory, SomeValidatorFactory)
    .addCondition(EVERY_CONDITION, DataRuleParserFactory, EveryValidatorFactory)
    .addCondition(SUM_MATCHES_RULE_CONDITION, ListFilterDataRuleParserFactory, SumMatchesRuleValidatorFactory);

export function createRuleTree(schema) {
    return treeBuilder.build(schema);
}
