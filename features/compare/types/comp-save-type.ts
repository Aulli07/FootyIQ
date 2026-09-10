import { ComparisonContext, ComparisonScope } from "./comparison-main-type";

export type SelectedComparisonContext = {
  context: ComparisonContext | null;
  scope: ComparisonScope;
  label: string;
};

export type NewComparisonType = {
  playerA: string;
  playerB: string;
  context: ComparisonContext;
  scopeA: ComparisonScope;
  scopeB: ComparisonScope;
};
