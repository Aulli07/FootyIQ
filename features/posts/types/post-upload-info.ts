import { Dispatch, RefObject, SetStateAction } from "react";
import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import { compStatRecord } from "@/features/compare/types/comp-image-type";



export type PostInfoType = {
  shouldUpload: boolean;
  setShouldUpload: Dispatch<SetStateAction<boolean>>;
  selectedComparisonData: ComparisonType | null;
  comparisonPostStats: compStatRecord | undefined;
  myRef: RefObject<HTMLTextAreaElement | null>;
  lastPostKeyRef: RefObject<string | null>;
}