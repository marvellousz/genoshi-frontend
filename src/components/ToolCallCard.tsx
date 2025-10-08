import { Tool } from '../types/chat';
import { Loader2, CheckCircle, XCircle, Clock, Calculator, Cloud, Image, Database, FileText } from 'lucide-react';

interface ToolCallCardProps {
  tool: Tool;
}

const toolIcons: Record<string, any> = {
  weather: Cloud,
  calculator: Calculator,
  image_generator: Image,
  database_query: Database,
  file_operations: FileText,
};

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-gray-400',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    label: 'Pending',
  },
  running: {
    icon: Loader2,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    label: 'Running',
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Completed',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Failed',
  },
};

export function ToolCallCard({ tool }: ToolCallCardProps) {
  const ToolIcon = toolIcons[tool.name] || FileText;
  const statusInfo = statusConfig[tool.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className={`rounded-lg border ${statusInfo.border} ${statusInfo.bg} p-4 transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-lg bg-white p-2 shadow-sm`}>
          <ToolIcon className="w-5 h-5 text-gray-700" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 capitalize">
              {tool.name.replace(/_/g, ' ')}
            </h4>
            <div className={`flex items-center gap-1 text-xs ${statusInfo.color}`}>
              <StatusIcon className={`w-3.5 h-3.5 ${statusInfo.animate ? 'animate-spin' : ''}`} />
              <span className="font-medium">{statusInfo.label}</span>
            </div>
          </div>

          {tool.result && tool.status === 'completed' && (
            <div className="mt-2 text-sm text-gray-600">
              <pre className="bg-white rounded p-2 overflow-x-auto border border-gray-200">
                {JSON.stringify(tool.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
