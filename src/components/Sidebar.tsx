import React, { useState } from 'react';
import type { HistoryItem, PromptData } from '@/types/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { PromptForm } from './PromptForm';
import type { Locale } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sparkles, Globe, History as HistoryIcon, ChevronUp, X } from 'lucide-react';

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
                  crossClassName="text-primary/50"
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <aside className="w-full lg:w-[35%] xl:w-[30%] lg:max-w-lg bg-light-gray lg:border-r border-border-light flex flex-col relative overflow-hidden h-screen">
      {/* Contenido principal de la sidebar */}
      <div className="flex flex-col p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-grow overflow-y-auto">
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
      </div>

      {/* Botón en el footer */}
      <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 pt-4 bg-light-gray border-t border-border-light z-10">
        <Button
          onClick={() => setIsHistoryOpen(true)}
          className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-white font-semibold py-3 flex items-center justify-center gap-2"
        >
          <HistoryIcon className="h-5 w-5" />
          {t('sidebar.history.title')}
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>

      {/* Drawer interno personalizado SIN portal */}
      {isHistoryOpen && (
        <>
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20 z-20 transition-opacity duration-300"
            onClick={() => setIsHistoryOpen(false)}
          />

          {/* Drawer content */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[70vh] bg-light-gray border-t-2 border-border-light rounded-t-xl z-30 flex flex-col animate-in slide-in-from-bottom duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-text-primary-light">
                {t('sidebar.history.title')}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHistoryOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-border-light"
              >
                <X className="h-5 w-5 text-text-secondary-light" />
              </Button>
            </div>

            {/* Content con scroll */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6">
              <History
                history={props.history}
                onSelect={(item) => {
                  props.onSelect(item);
                  setIsHistoryOpen(false);
                }}
                onClear={props.onClearHistory}
              />
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
