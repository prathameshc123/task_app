import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Alert = ({ type = 'error', message }) => {
  if (!message) return null;

  return (
    <div
      className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${
        type === 'error'
          ? 'bg-red-50 text-red-700 border border-red-200'
          : 'bg-green-50 text-green-700 border border-green-200'
      }`}
    >
      {type === 'error' ? (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Alert;
