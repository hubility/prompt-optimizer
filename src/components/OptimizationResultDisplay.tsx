import React, { useState, useEffect } from 'react';
import type { OptimizationResultData } from '@/types/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { translateText } from '@/services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Copy, Languages, RefreshCw, CheckCircle2, Lightbulb, Loader2, Check, Save } from 'lucide-react';
import { SavePromptModal } from './SavePromptModal';

const MarkdownDisplay: React.FC<{ content: string }> = React.memo(({ content }) => {
    return (
        <div className="prose prose-invert max-w-none text-text-secondary-dark prose-p:my-3 prose-headings:text-text-primary-dark prose-strong:text-text-primary-dark prose-ul:my-3 prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
});

MarkdownDisplay.displayName = 'MarkdownDisplay';

const languageOptions: { code: string; nameKey: string }[] = [
    { code: 'en', nameKey: 'language.en' },
    { code: 'es', nameKey: 'language.es' },
    { code: 'pt-BR', nameKey: 'language.pt-BR' },
];

interface OptimizationResultDisplayProps {
  result: OptimizationResultData;
  onOptimizeAgain: () => void;
  purpose: string;
}

interface TranslationState {
    status: 'loading' | 'success' | 'error';
    content?: string;
    error?: string;
}

export const OptimizationResultDisplay: React.FC<OptimizationResultDisplayProps> = ({ result, onOptimizeAgain, purpose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('original');
  const [translations, setTranslations] = useState<Record<string, TranslationState>>({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setActiveTab('original');
    setTranslations({});
    setIsSaved(false);
  }, [result]);

  const handleCopy = () => {
    let textToCopy = result.optimized_prompt;
    const currentTranslation = translations[activeTab] as TranslationState | undefined;

    if (activeTab !== 'original' && currentTranslation?.status === 'success') {
      textToCopy = currentTranslation.content || '';
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTranslate = async (langCode: string) => {
    if (translations[langCode]?.status === 'success') {
        setActiveTab(langCode);
        return;
    }

    setActiveTab(langCode);
    setTranslations(prev => ({ ...prev, [langCode]: { status: 'loading' } }));

    try {
        const translated = await translateText(result.optimized_prompt, langCode);
        setTranslations(prev => ({ ...prev, [langCode]: { status: 'success', content: translated } }));
    } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "Translation failed";
        setTranslations(prev => ({ ...prev, [langCode]: { status: 'error', error: errorMsg } }));
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <Card className="bg-card-dark border-border-dark flex-grow flex flex-col">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-text-primary-dark">
                    {t('results.title')}
                </CardTitle>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      {isSaved && (
                        <Badge className="bg-accent-green text-white font-semibold">
                          {t('results.savePrompt.savedBadge')}
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-border-dark text-text-primary-dark hover:bg-[#333] text-xs sm:text-sm h-8 sm:h-9">
                                <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                                <span className="hidden sm:inline">{t('results.translate')}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card-dark border-border-dark">
                            {languageOptions.map(lang => (
                                <DropdownMenuItem
                                    key={lang.code}
                                    onClick={() => handleTranslate(lang.code)}
                                    className="text-text-primary-dark hover:bg-border-dark cursor-pointer"
                                >
                                    {t(lang.nameKey)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="bg-border-dark text-text-primary-dark hover:bg-[#333] text-xs sm:text-sm h-8 sm:h-9"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                                <span className="hidden sm:inline">{t('results.copied')}</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                                <span className="hidden sm:inline">{t('results.copy')}</span>
                            </>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSaveModalOpen(true)}
                        className="bg-border-dark text-text-primary-dark hover:bg-[#333] text-xs sm:text-sm h-8 sm:h-9"
                    >
                        <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t('results.save')}</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onOptimizeAgain}
                        className="bg-border-dark text-text-primary-dark hover:bg-[#333] text-xs sm:text-sm h-8 sm:h-9"
                    >
                        <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t('results.optimizeAgain')}</span>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col min-h-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
                    <TabsList className="bg-transparent border-b border-border-dark rounded-none h-auto p-0 gap-0">
                        <TabsTrigger
                            value="original"
                            className="rounded-none border-0 data-[state=active]:bg-dark-gray data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-border-dark data-[state=active]:text-text-primary-dark text-text-secondary-dark"
                        >
                            Original
                        </TabsTrigger>
                        {Object.keys(translations).map(langCode => (
                            <TabsTrigger
                                key={langCode}
                                value={langCode}
                                className="rounded-none border-0 data-[state=active]:bg-dark-gray data-[state=active]:border-t data-[state=active]:border-x data-[state=active]:border-border-dark data-[state=active]:text-text-primary-dark text-text-secondary-dark"
                            >
                                {t(`language.${langCode}`)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="bg-dark-gray border-x border-b border-border-dark rounded-b-md flex-grow overflow-y-auto p-6">
                        <TabsContent value="original" className="mt-0">
                            <MarkdownDisplay content={result.optimized_prompt} />
                        </TabsContent>

                        {Object.entries(translations).map(([langCode, state]: [string, TranslationState]) => (
                            <TabsContent key={langCode} value={langCode} className="mt-0">
                                {state.status === 'loading' && (
                                    <div className="flex items-center justify-center h-full text-text-secondary-dark">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {t('results.translating')}...
                                    </div>
                                )}
                                {state.status === 'error' && (
                                    <p className="text-accent-red">{state.error}</p>
                                )}
                                {state.status === 'success' && state.content && (
                                    <MarkdownDisplay content={state.content} />
                                )}
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
            <Card className="bg-card-dark border-border-dark">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-text-primary-dark">
                        {t('results.improvements.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2.5 sm:space-y-3">
                    {result.improvements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-2.5">
                            <CheckCircle2 className="text-accent-green h-4 w-4 sm:h-4.5 sm:w-4.5 mt-0.5 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-text-secondary-dark leading-relaxed">
                                {item}
                            </p>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-card-dark border-border-dark">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-text-primary-dark">
                        {t('results.tips.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2.5 sm:space-y-3">
                        {result.tips.map((item, index) => (
                            <div key={index} className="flex items-start gap-2 sm:gap-2.5">
                                <Lightbulb className="text-accent-orange h-4 w-4 sm:h-4.5 sm:w-4.5 mt-0.5 flex-shrink-0" />
                                <p className="text-xs sm:text-sm text-text-secondary-dark leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <SavePromptModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          optimizedPrompt={result.optimized_prompt}
          tips={result.tips}
          purpose={purpose}
          onSaved={() => setIsSaved(true)}
        />
    </div>
  );
};
