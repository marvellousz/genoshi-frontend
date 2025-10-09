import { Tool } from '../types/chat';
import { Loader2, CheckCircle, XCircle, Clock, Calculator, Cloud, Image, Database, FileText, LucideIcon } from 'lucide-react';

interface ToolCallCardProps {
  tool: Tool;
}

const toolIcons: Record<string, LucideIcon> = {
  weather: Cloud,
  calculator: Calculator,
  image_generator: Image,
  database_query: Database,
  file_operations: FileText,
};

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-gray-500 dark:text-gray-400',
    bg: 'bg-gray-100/50 dark:bg-gray-800/50',
    border: 'border-gray-200/50 dark:border-gray-700/50',
    glow: 'from-gray-400/20 to-gray-500/20',
    label: 'Pending',
  },
  running: {
    icon: Loader2,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50/50 dark:bg-blue-900/20',
    border: 'border-blue-200/50 dark:border-blue-700/50',
    glow: 'from-blue-400/30 to-indigo-500/30',
    label: 'Running',
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50/50 dark:bg-emerald-900/20',
    border: 'border-emerald-200/50 dark:border-emerald-700/50',
    glow: 'from-emerald-400/30 to-teal-500/30',
    label: 'Completed',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50/50 dark:bg-red-900/20',
    border: 'border-red-200/50 dark:border-red-700/50',
    glow: 'from-red-400/30 to-pink-500/30',
    label: 'Failed',
  },
};

export function ToolCallCard({ tool }: ToolCallCardProps) {
  const ToolIcon = toolIcons[tool.name] || FileText;
  const statusInfo = statusConfig[tool.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${statusInfo.glow} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className={`relative rounded-2xl border ${statusInfo.border} ${statusInfo.bg} backdrop-blur-sm p-5 transition-all duration-300 shadow-lg hover:shadow-xl`}>
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${statusInfo.glow} rounded-xl blur-md opacity-50`}></div>
            <div className={`relative rounded-xl bg-white dark:bg-gray-800 p-3 shadow-lg`}>
              <ToolIcon className={`w-6 h-6 ${statusInfo.color}`} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-bold text-gray-900 dark:text-white capitalize text-base">
                {tool.name.replace(/_/g, ' ')}
              </h4>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color} border ${statusInfo.border}`}>
                <StatusIcon className={`w-4 h-4 ${'animate' in statusInfo && statusInfo.animate ? 'animate-spin' : ''}`} />
                <span className="font-semibold text-xs uppercase tracking-wider">{statusInfo.label}</span>
              </div>
            </div>

            {tool.result !== null && tool.result !== undefined && tool.status === 'completed' && (
              <div className="mt-3">
                <div className="relative overflow-hidden rounded-xl">
                  <pre className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-xl p-4 overflow-x-auto border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-800 dark:text-gray-200 font-mono shadow-inner">
                    {JSON.stringify(tool.result, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
