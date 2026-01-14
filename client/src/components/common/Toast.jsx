// src/components/common/Toast.jsx
'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[300px] max-w-md animate-slide-in`}>
      <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <p className={`${config.textColor} text-sm font-medium flex-1`}>{message}</p>
      {onClose && (
        <button onClick={onClose} className={`${config.iconColor} hover:opacity-70`}>
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;