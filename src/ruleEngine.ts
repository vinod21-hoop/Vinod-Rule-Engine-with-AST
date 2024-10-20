import { Node, NodeType } from './types';

export function createRule(ruleString: string): Node {
  const tokens = ruleString.match(/$$|$$|\w+|[<>=!]+|\d+|'[^']*'/g) || [];
  let position = 0;

  function parseExpression(): Node {
    let node = parseTerm();

    while (position < tokens.length && (tokens[position] === 'AND' || tokens[position] === 'OR')) {
      const operator = tokens[position++];
      const right = parseTerm();
      node = { type: 'operator', value: operator, left: node, right };
    }

    return node;
  }

  function parseTerm(): Node {
    if (tokens[position] === '(') {
      position++;
      const node = parseExpression();
      position++; // Skip closing parenthesis
      return node;
    }

    const left = { type: 'operand', value: tokens[position++] };
    const operator = tokens[position++];
    const right = { type: 'operand', value: tokens[position++] };

    return { type: 'operator', value: operator, left, right };
  }

  return parseExpression();
}

export function combineRules(rules: string[]): Node {
  if (rules.length === 0) {
    throw new Error("No rules provided");
  }

  if (rules.length === 1) {
    return createRule(rules[0]);
  }

  const combinedRule = rules.map(createRule).reduce((acc, rule) => ({
    type: 'operator',
    value: 'AND',
    left: acc,
    right: rule
  }));

  return combinedRule;
}

export function evaluateRule(rule: Node, data: Record<string, any>): boolean {
  if (rule.type === 'operand') {
    return data[rule.value as string] || rule.value as boolean;
  }

  const left = evaluateRule(rule.left!, data);
  const right = evaluateRule(rule.right!, data);

  switch (rule.value) {
    case 'AND': return left && right;
    case 'OR': return left || right;
    case '>': return left > right;
    case '<': return left < right;
    case '>=': return left >= right;
    case '<=': return left <= right;
    case '=': return left === right;
    case '!=': return left !== right;
    default: throw new Error(`Unknown operator: ${rule.value}`);
  }
}