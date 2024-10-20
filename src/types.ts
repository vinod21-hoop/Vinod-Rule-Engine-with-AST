export type NodeType = 'operator' | 'operand';

export interface Node {
  type: NodeType;
  value: string;
  left?: Node;
  right?: Node;
}