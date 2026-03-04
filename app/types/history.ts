export type UserHistoryType= {
  userId: "string",
  history: ComparisonHistoryType[]
}

type ComparisonHistoryType = {
  comparisonId: string;
  itemdCompared: string[];
  seasonsCompared: string[];
  result: string;
  timestamp: number;
}