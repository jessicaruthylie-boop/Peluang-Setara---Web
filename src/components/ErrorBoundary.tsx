import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-container" className="p-8 my-8 max-w-4xl mx-auto bg-rose-50 border border-rose-200 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 text-rose-600">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider">
                {this.props.fallbackTitle || 'Terjadi Kesalahan Tampilan'}
              </h2>
              <p className="text-xs text-rose-500 font-semibold">
                Sistem mendeteksi adanya error runtime pada komponen ini.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-auto max-h-72 space-y-2">
            <p className="font-bold text-rose-400">Error: {this.state.error?.message || 'Unknown Error'}</p>
            {this.state.error?.stack && (
              <pre className="text-[10px] leading-relaxed text-slate-300 opacity-90 whitespace-pre-wrap">
                {this.state.error.stack}
              </pre>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
