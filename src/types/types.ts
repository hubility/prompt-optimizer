
export interface OptionalParameter {
  id: string;
  labelKey: string;
  type: 'text' | 'slider' | 'select';
  placeholderKey?: string;
  options?: { value: string; labelKey: string }[];
}

export interface PurposeCategory {
  id: string;
  nameKey: string;
  descriptionKey: string;
  parameters: OptionalParameter[];
}

export interface PromptData {
  originalPrompt: string;
  purpose: string;
  optionalParams: Record<string, string | number>;
}

export interface OptimizationResultData {
  optimized_prompt: string;
  improvements: string[];
  tips: string[];
  techniques_applied: string[];
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  promptData: PromptData;
  result: OptimizationResultData;
}

export interface SavedPromptData {
  id: string;
  title: string;
  optimizedPrompt: string;
  tips: string[];
  purpose: string;
  isPublic: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
