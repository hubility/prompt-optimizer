"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { trpc } from '@/lib/trpc';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

interface SavePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  optimizedPrompt: string;
  tips: string[];
  purpose: string;
  onSaved?: () => void;
}

export function SavePromptModal({
  isOpen,
  onClose,
  optimizedPrompt,
  tips,
  purpose,
  onSaved
}: SavePromptModalProps) {
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const { toast } = useToast();

  const createPrompt = trpc.prompts.create.useMutation({
    onSuccess: () => {
      utils.prompts.invalidate();
      onSaved?.();
      handleClose();
      toast({
        title: t('results.savePrompt.success'),
      });
    },
    onError: (error) => {
      console.error('Error saving prompt:', error);
      console.error('Error details:', {
        message: error.message,
        data: error.data,
        shape: error.shape,
      });
      toast({
        variant: 'destructive',
        title: t('results.savePrompt.error'),
        description: error.message,
      });
    },
  });

  const handleClose = () => {
    setTitle('');
    setIsPublic(false);
    onClose();
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    if (!optimizedPrompt || !optimizedPrompt.trim()) {
      console.error('Save prompt aborted: optimized prompt is empty');
      toast({
        variant: 'destructive',
        title: t('results.savePrompt.error'),
      });
      return;
    }

    if (!purpose) {
      console.error('Save prompt aborted: purpose is missing');
      toast({
        variant: 'destructive',
        title: t('results.savePrompt.error'),
      });
      return;
    }

    const payload = {
      title: trimmedTitle,
      optimizedPrompt: optimizedPrompt.trim(),
      tips: Array.isArray(tips) ? [...tips] : [],
      purpose,
      isPublic: Boolean(isPublic),
    };

    console.log('Sending data to tRPC:', payload);
    createPrompt.mutate(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('results.savePrompt.title')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('results.savePrompt.title')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('results.savePrompt.titleLabel')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder={t('results.savePrompt.titlePlaceholder')}
              className="w-full"
            />
            <p className="text-xs text-text-secondary-light text-right">
              {title.length}/200
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public" className="cursor-pointer">
              {t('results.savePrompt.makePublic')}
            </Label>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleClose} disabled={createPrompt.isPending}>
            {t('results.savePrompt.cancel')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || createPrompt.isPending}
            className="bg-accent-primary hover:bg-accent-primary-hover"
          >
            {createPrompt.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {createPrompt.isPending ? t('results.savePrompt.saving') : t('results.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
