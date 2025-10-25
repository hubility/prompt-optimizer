
import type { PurposeCategory } from '@/types/types';

export const PURPOSE_CATEGORIES: PurposeCategory[] = [
    {
    id: 'creative_text_generation',
    nameKey: 'purpose.creative_text_generation.name',
    descriptionKey: 'purpose.creative_text_generation.description',
    parameters: [
      { 
        id: 'tone', 
        labelKey: 'params.tone.label', 
        type: 'select', 
        options: [
            { value: 'default', labelKey: 'params.tone.options.default' },
            { value: 'formal', labelKey: 'params.tone.options.formal' },
            { value: 'casual', labelKey: 'params.tone.options.casual' },
            { value: 'humorous', labelKey: 'params.tone.options.humorous' },
            { value: 'professional', labelKey: 'params.tone.options.professional' },
        ]
      },
    ],
  },
  {
    id: 'image_generation',
    nameKey: 'purpose.image_generation.name',
    descriptionKey: 'purpose.image_generation.description',
    parameters: [
      { id: 'style', labelKey: 'params.style.label', type: 'text', placeholderKey: 'params.style.placeholder' },
      { id: 'creativity', labelKey: 'params.creativity.label', type: 'slider' },
    ],
  },
  {
    id: 'code_generation',
    nameKey: 'purpose.code_generation.name',
    descriptionKey: 'purpose.code_generation.description',
    parameters: [
      { id: 'language', labelKey: 'params.language.label', type: 'text', placeholderKey: 'params.language.placeholder' },
      { id: 'framework', labelKey: 'params.framework.label', type: 'text', placeholderKey: 'params.framework.placeholder' },
    ],
  },
  {
    id: 'analysis_insights',
    nameKey: 'purpose.analysis_insights.name',
    descriptionKey: 'purpose.analysis_insights.description',
    parameters: [
      { id: 'analysisType', labelKey: 'params.analysisType.label', type: 'text', placeholderKey: 'params.analysisType.placeholder' },
      { id: 'outputFormat', labelKey: 'params.outputFormat.label', type: 'text', placeholderKey: 'params.outputFormat.placeholder' },
    ],
  },
  {
    id: 'agents_assistants',
    nameKey: 'purpose.agents_assistants.name',
    descriptionKey: 'purpose.agents_assistants.description',
    parameters: [
      { id: 'personality', labelKey: 'params.personality.label', type: 'text', placeholderKey: 'params.personality.placeholder' },
      { id: 'context', labelKey: 'params.context.label', type: 'text', placeholderKey: 'params.context.placeholder' },
    ],
  },
];
