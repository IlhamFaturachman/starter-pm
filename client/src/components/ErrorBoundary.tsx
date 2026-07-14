import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center p-8">
            <div className="max-w-md text-center">
              <h1 className="text-2xl font-semibold text-red-600">
                Something went wrong
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                {this.state.error?.message ?? 'Unknown error'}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
