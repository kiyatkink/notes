import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from 'pages/ErrorPage';

export interface ErrorBoundaryState {
    hasError: boolean,
}
export interface ErrorBoundaryProps {
    children?: ReactNode
}
export class ErrorBoundary
  extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <ErrorPage />;
    }
    return children;
  }
}
