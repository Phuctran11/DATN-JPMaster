import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export function useGoogleScript(clientId: string | undefined, onSuccess: (response: any) => void, onError: (error: Error) => void) {
  const initializeGoogleSignIn = useCallback(() => {
    if (!clientId) {
      onError(new Error('Google Client ID is not configured'));
      return;
    }

    if (!window.google) {
      onError(new Error('Google Sign-In library not loaded'));
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          if (response.credential) {
            onSuccess(response);
          } else {
            onError(new Error('No credential received from Google'));
          }
        },
      });
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to initialize Google Sign-In'));
    }
  }, [clientId, onSuccess, onError]);

  useEffect(() => {
    const checkGoogleLoaded = setInterval(() => {
      if (window.google) {
        initializeGoogleSignIn();
        clearInterval(checkGoogleLoaded);
      }
    }, 100);

    // Cleanup timeout after 5 seconds
    const timeout = setTimeout(() => clearInterval(checkGoogleLoaded), 5000);

    return () => {
      clearInterval(checkGoogleLoaded);
      clearTimeout(timeout);
    };
  }, [initializeGoogleSignIn]);

  const renderButton = (elementId: string) => {
    if (!window.google) {
      console.error('Google Sign-In library not loaded');
      return;
    }

    try {
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          logo_alignment: 'left',
        }
      );
    } catch (error) {
      console.error('Failed to render Google button:', error);
    }
  };

  return { renderButton };
}

