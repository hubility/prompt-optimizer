import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Languages,
  RefreshCw,
  Lightbulb,
  ChevronDown,
  Wand2,
  Globe,
  type LucideIcon
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

// Mapeamento de ícones Material Symbols para Lucide React
const iconMap: Record<string, LucideIcon> = {
  'auto_awesome': Sparkles,
  'check_circle': CheckCircle2,
  'error': XCircle,
  'content_copy': Copy,
  'translate': Languages,
  'refresh': RefreshCw,
  'lightbulb': Lightbulb,
  'expand_more': ChevronDown,
  'auto_fix_high': Wand2,
  'language': Globe,
  'hourglass_empty': RefreshCw, // Usando RefreshCw como spinner
};

export const Icon: React.FC<IconProps> = ({ name, className = '', style }) => {
  const LucideIcon = iconMap[name] || Sparkles; // Default icon

  return <LucideIcon className={className} style={style} size={20} />;
};
