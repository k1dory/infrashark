import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              maxWidth: 520,
              padding: 24,
              background: 'var(--color-bg-panel)',
              border: '1px solid var(--color-danger)',
              borderRadius: 12,
            }}
          >
            <h2 style={{ color: 'var(--color-danger)', marginBottom: 12 }}>
              Something went wrong
            </h2>
            <pre
              style={{
                fontSize: 12,
                background: 'var(--color-bg-input)',
                padding: 12,
                borderRadius: 6,
                overflow: 'auto',
                maxHeight: 240,
                whiteSpace: 'pre-wrap',
              }}
            >
              {this.state.error.message}
              {'\n'}
              {this.state.error.stack}
            </pre>
            <button
              onClick={this.reset}
              style={{
                marginTop: 12,
                padding: '8px 16px',
                background: 'var(--color-accent)',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
