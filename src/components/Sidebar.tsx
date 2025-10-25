import React, { useState, useRef, useEffect } from 'react';
import type { HistoryItem, PromptData } from '@/types/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { PromptForm } from './PromptForm';
import type { Locale } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sparkles, Globe } from 'lucide-react';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
];

const formatDate = (dateString: string, t: (key: string) => string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const rtf = new Intl.RelativeTimeFormat(t('locale_code'), { numeric: 'auto' });
  const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (date.toDateString() === today.toDateString()) {
    return `${t('sidebar.date.today')}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return `${t('sidebar.date.yesterday')}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diffDays > -7) {
     return rtf.format(diffDays, 'day');
  }
  return date.toLocaleDateString();
};

const LanguageSwitcher = () => {
  const { setLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-border-light">
          <Globe className="h-5 w-5 text-text-secondary-light" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const History: React.FC<{ history: HistoryItem[], onSelect: (item: HistoryItem) => void, onClear: () => void }> = ({ history, onSelect, onClear }) => {
  const { t } = useTranslation();

  return (
    <div className="flex-grow flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-text-primary-light">{t('sidebar.history.title')}</h2>
        {history.length > 0 && (
          <Button
            variant="link"
            onClick={onClear}
            className="h-auto p-0 text-sm text-accent-primary hover:text-accent-primary-hover"
          >
            {t('sidebar.history.clear')}
          </Button>
        )}
      </div>
      <div className="space-y-2 overflow-y-auto flex-grow pr-2 -mr-2 max-h-64 md:max-h-80 lg:max-h-96 xl:max-h-full">
        {history.length > 0 ? (
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.id}>
                <Card
                  onClick={() => onSelect(item)}
                  className="p-2.5 sm:p-3 cursor-pointer hover:bg-white/50 transition-colors border-border-light bg-white/80 group"
                >
                  <p className="text-xs sm:text-sm truncate text-text-primary-light font-medium group-hover:text-accent-primary">
                    {item.promptData.originalPrompt}
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary-light mt-1">
                    {formatDate(item.timestamp, t)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

interface SidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onOptimize: (data: PromptData) => void;
  isLoading: boolean;
  initialData: PromptData | null;
  onClearHistory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <aside className="w-full lg:w-[35%] xl:w-[30%] lg:max-w-lg bg-light-gray lg:border-r border-border-light flex flex-col p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="text-accent-primary h-6 w-6 sm:h-8 sm:w-8" />
            <h1 className="text-lg sm:text-xl font-bold text-text-primary-light">{t('sidebar.title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <PromptForm
          onSubmit={props.onOptimize}
          isLoading={props.isLoading}
          initialData={props.initialData}
        />
      </div>
      <History history={props.history} onSelect={props.onSelect} onClear={props.onClearHistory} />
    </aside>
  );
};
