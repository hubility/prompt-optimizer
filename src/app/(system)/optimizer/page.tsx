'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { OptimizationResultDisplay } from '@/components/OptimizationResultDisplay';
import { optimizePrompt } from '@/services/geminiService';
import type { HistoryItem, OptimizationResultData, PromptData } from '@/types/types';
import { Sparkles, XCircle, FileEdit } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activePromptData, setActivePromptData] = useState<PromptData | null>(null);
  const [currentResult, setCurrentResult] = useState<OptimizationResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('promptHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('promptHistory');
    }
  }, []);
  
  const updateHistory = (newHistory: HistoryItem[]) => {
      setHistory(newHistory);
      localStorage.setItem('promptHistory', JSON.stringify(newHistory));
  }

  const handleOptimize = async (promptData: PromptData) => {
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);
    setActivePromptData(promptData);

    try {
      const result = await optimizePrompt(promptData);
      setCurrentResult(result);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        promptData,
        result,
      };

      updateHistory([newHistoryItem, ...history].slice(0, 10));

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const onOptimizeAgain = () => {
      if (activePromptData) {
          handleOptimize(activePromptData);
      }
  }

  const handleSelectHistory = useCallback((item: HistoryItem) => {
    setActivePromptData(item.promptData);
    setCurrentResult(item.result);
    setError(null);
  }, []);
  
  const handleNewOptimization = () => {
      setActivePromptData(null);
      setCurrentResult(null);
      setError(null);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar
        history={history}
        onSelect={handleSelectHistory}
        onOptimize={handleOptimize}
        isLoading={isLoading}
        initialData={activePromptData}
        onClearHistory={() => updateHistory([])}
      />
      <main className="w-full flex-grow bg-dark-gray text-text-primary-dark p-4 sm:p-6 lg:p-8">
          <div className="w-full h-full flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-text-secondary-dark text-center px-4">
                <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 animate-pulse text-accent-primary" />
                <p className="mt-4 text-base sm:text-lg font-medium">{t('results.loading.title')}</p>
                <p className="text-xs sm:text-sm">{t('results.loading.text')}</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center bg-accent-red/10 text-accent-red border border-accent-red/20 rounded-lg p-6 sm:p-8 max-w-md mx-auto text-center">
                 <XCircle className="h-12 w-12 sm:h-16 sm:w-16" />
                <p className="mt-4 font-bold text-base sm:text-lg">{t('results.error.title')}</p>
                <p className="mt-2 text-xs sm:text-sm">{error}</p>
              </div>
            )}
            {!isLoading && currentResult && activePromptData && (
              <OptimizationResultDisplay
                result={currentResult}
                onOptimizeAgain={onOptimizeAgain}
                purpose={activePromptData.purpose}
              />
            )}
            {!isLoading && !currentResult && !error && (
              <div className="text-center text-text-secondary-dark px-4">
                  <FileEdit className="h-16 w-16 sm:h-20 sm:w-20 text-border-dark mx-auto" />
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary-dark mt-4">{t('results.placeholder.title')}</h3>
                  <p className="text-sm sm:text-md mt-2">{t('results.placeholder.text')}</p>
              </div>
            )}
          </div>
      </main>
    </div>
  );
};
