'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Něco se pokazilo</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Došlo k neočekávané chybě.'}
            </p>
            <Button
              onClick={() => this.setState({ hasError: false })}
            >
              Zkusit znovu
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
