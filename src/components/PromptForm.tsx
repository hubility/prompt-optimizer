import React, { useState, useEffect, useMemo } from 'react';
import { PURPOSE_CATEGORIES } from '@/app/constants';
import type { PromptData, OptionalParameter } from '@/types/types';
import { useTranslation } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, Wand2 } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (data: PromptData) => void;
  isLoading: boolean;
  initialData?: PromptData | null;
}

const MAX_PROMPT_LENGTH = 4000;

export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading, initialData }) => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [purpose, setPurpose] = useState(PURPOSE_CATEGORIES[0].id);
  const [optionalParams, setOptionalParams] = useState<Record<string, string | number>>({});
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setOriginalPrompt(initialData.originalPrompt);
      setPurpose(initialData.purpose);
      setOptionalParams(initialData.optionalParams);
    } else {
      setOriginalPrompt('');
      setPurpose(PURPOSE_CATEGORIES[0].id);
      setOptionalParams({});
    }
  }, [initialData]);

  const currentParameters = useMemo(() => {
    return PURPOSE_CATEGORIES.find(p => p.id === purpose)?.parameters || [];
  }, [purpose]);

  const handleParamChange = (id: string, value: string | number) => {
    setOptionalParams(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (originalPrompt.trim() && !isLoading) {
      onSubmit({ originalPrompt, purpose, optionalParams });
    }
  };

  const renderParameter = (param: OptionalParameter) => {
    switch (param.type) {
      case 'text':
        return (
          <div key={param.id} className="space-y-2">
            <Label htmlFor={param.id}>{t(param.labelKey)}</Label>
            <Input
              id={param.id}
              type="text"
              value={(optionalParams[param.id] as string) || ''}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
              placeholder={param.placeholderKey ? t(param.placeholderKey) : ''}
              className="bg-white/100 border-border-light focus-visible:ring-primary"
            />
          </div>
        );
       case 'select':
        return (
          <div key={param.id} className="space-y-2">
            <Label htmlFor={param.id}>{t(param.labelKey)}</Label>
            <Select
              value={(optionalParams[param.id] as string) || (param.options && param.options[0].value)}
              onValueChange={(value) => handleParamChange(param.id, value)}
            >
              <SelectTrigger className="bg-white border-border-light focus:ring-accent-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {param.options?.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'slider':
        const value = (optionalParams[param.id] as number) || 75;
        return (
          <div key={param.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={param.id}>{t(param.labelKey)}</Label>
              <span className="text-sm text-text-primary-light font-medium">{value}%</span>
            </div>
            <Slider
              id={param.id}
              min={0}
              max={100}
              step={1}
              value={[value]}
              onValueChange={(vals) => handleParamChange(param.id, vals[0])}
              className="[&_[role=slider]]:bg-accent-primary [&_[role=slider]]:border-accent-primary"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="original-prompt">{t('form.originalPrompt.label')}</Label>
        <Textarea
          id="original-prompt"
          rows={6}
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          maxLength={MAX_PROMPT_LENGTH}
          placeholder={t('form.originalPrompt.placeholder')}
          className="h-[150px] bg-white border-border-light focus-visible:ring-primary resize-none"
        />
        <p className="text-xs text-text-secondary-light text-right">
          {originalPrompt.length}/{MAX_PROMPT_LENGTH}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">{t('form.purpose.label')}</Label>
        <Select
          value={purpose}
          onValueChange={(value) => {
            setPurpose(value);
            setOptionalParams({});
          }}
        >
          <SelectTrigger id="purpose" className="bg-white border-border-light focus:ring-accent-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_CATEGORIES.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                {t(cat.nameKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentParameters.length > 0 && (
        <>
          <Separator className="bg-border-light" />
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary-light">
              {t('form.optionalParams.title')}
            </h3>
            {currentParameters.map(renderParameter)}
          </div>
        </>
      )}

      <Button
        type="submit"
        disabled={isLoading || !originalPrompt.trim()}
        className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white font-semibold"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t('form.button.optimizing')}
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-5 w-5" />
            {t('form.button.optimize')}
          </>
        )}
      </Button>
    </form>
  );
};
