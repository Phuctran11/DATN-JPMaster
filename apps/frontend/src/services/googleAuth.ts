declare global {
  interface Window {
    google: any;
  }
}

interface GoogleCredentialResponse {
  credential: string;
}

export const googleAuthService = {
  initGoogleSignIn(clientId: string, onSuccess: (token: string) => void, onError: (error: Error) => void) {
    if (!window.google) {
      onError(new Error('Google Sign-In library not loaded. Verify script tag in index.html'));
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: GoogleCredentialResponse) => {
          if (response.credential) {
            onSuccess(response.credential);
          } else {
            onError(new Error('No credential received from Google'));
          }
        },
        error_callback: () => {
          onError(new Error('Google Sign-In initialization error. Check browser console for details.'));
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Google initialization error:', err);
      
      // Check for common issues
      if (message.includes('origin')) {
        onError(new Error('Origin not allowed. Add your current origin to Google Cloud Console > Credentials > JavaScript origins'));
      } else if (message.includes('client_id')) {
        onError(new Error('Invalid Client ID. Check VITE_GOOGLE_CLIENT_ID in .env.local'));
      } else {
        onError(new Error(`${message}`));
      }
    }
  },

  renderButton(elementId: string, options: any = {}) {
    if (!window.google) {
      console.error('Google Sign-In library not loaded');
      return;
    }

    const defaultOptions = {
      theme: 'outline',
      size: 'large',
      ...options,
    };

    window.google.accounts.id.renderButton(document.getElementById(elementId), defaultOptions);
  },

  renderOneTapUI() {
    if (!window.google) {
      console.error('Google Sign-In library not loaded');
      return;
    }

    window.google.accounts.id.prompt((notification: any) => {
      // Handle prompt state changes
      console.log('One-Tap UI state:', notification);
    });
  },
};
