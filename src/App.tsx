import React from 'react';
import './App.css'
import { useAuth } from 'context/auth-context';
import { AuthticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallBack } from 'components/lib'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* 处理渲染出错 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {
          user ? <AuthticatedApp /> : <UnauthenticatedApp />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;
