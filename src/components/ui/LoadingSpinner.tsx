interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({ size = 'md', message, fullScreen = false }: LoadingSpinnerProps) {
  const spinner = (
    <div className="text-center">
      <div className={`${sizeClasses[size]} border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3`} />
      {message && <p className="text-sm text-slate-500">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-[#f0f5f0] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
}

export function LoadingScreen({ message = 'Loading your dashboard...' }: { message?: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#111]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#A3E635] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
}
