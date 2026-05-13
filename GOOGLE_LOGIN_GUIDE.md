# Hướng dẫn Cấu hình Google Login

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google
3. Tạo project mới:
   - Click "Select a project" → "NEW PROJECT"
   - Đặt tên: "JPMaster"
   - Click "Create"

## Bước 2: Bật Google+ API

1. Trong Console, tìm kiếm "Google+ API"
2. Click vào Google+ API
3. Nhấn "ENABLE"

## Bước 3: Cấu hình OAuth Consent Screen

1. Vào menu bên trái → "OAuth consent screen"
2. Chọn "External" (để cho phép tài khoản cá nhân)
3. Click "Create"
4. Điền thông tin:
   - **App name**: JPMaster
   - **User support email**: your-email@gmail.com
   - **Developer contact**: your-email@gmail.com
5. Click "Save and Continue"
6. Bỏ qua Scopes (click "Save and Continue")
7. Thêm tester (Optional, click "Save and Continue")
8. Click "Back to Dashboard"

## Bước 4: Tạo OAuth 2.0 Client ID

1. Vào menu bên trái → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Chọn "Web application"
4. Điền cấu hình:
   - **Name**: JPMaster Web App
   - **JavaScript origins**: 
     - http://localhost:5173
     - http://localhost:3000
   - **Authorized redirect URIs**:
     - http://localhost:5173
     - http://localhost:3000
5. Click "Create"
6. Copy **Client ID** (bạn sẽ cần nó)

## Bước 5: Cấu hình Frontend

### 5.1 Tạo file .env

Tạo file `apps/frontend/.env.local` và thêm:

```
VITE_GOOGLE_CLIENT_ID=YOUR_COPIED_CLIENT_ID_HERE
```

### 5.2 Cập nhật main.tsx

Thêm Google Sign-In script vào `apps/frontend/src/main.tsx`:

```typescript
// Thêm trước ReactDOM.createRoot
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
document.head.appendChild(script);
```

Hoặc thêm vào `apps/frontend/index.html` trong phần `<head>`:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

## Bước 6: Cập nhật Backend

Thêm endpoint để xử lý Google login trong `apps/backend/src/controllers/user.controller.ts`:

```typescript
async googleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.body;
    
    // Verify token với Google
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo', {
      method: 'POST',
      body: new URLSearchParams({
        access_token: token,
      }),
    });

    if (!googleResponse.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const googleData = await googleResponse.json();
    const email = googleData.email;
    const username = googleData.name || email.split('@')[0];

    let user = await userModel.getUserByEmail(email);
    
    if (!user) {
      // Tạo user mới từ Google
      const passwordHash = await passwordService.hashPassword('google_oauth_' + Date.now());
      user = await userModel.createUser(username, email, passwordHash, 'learner');
    }

    const { password_hash, ...userWithoutPassword } = user;
    return res.status(200).json({ message: 'Google login successful', data: userWithoutPassword });
  } catch (error) {
    next(error);
  }
}
```

Thêm route trong `apps/backend/src/routes/user.routes.ts`:

```typescript
router.post("/google-login", userController.googleLogin.bind(userController));
```

## Bước 7: Cập nhật Login.tsx

Cập nhật nút Google login:

```typescript
import { useGoogleScript } from '../hooks/useGoogleScript';
import { googleAuthService } from '../services/googleAuth';
import { authAPI } from '../services/api';

function LoginForm() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  useGoogleScript(googleClientId);
  
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const response = await authAPI.googleLogin({ token: credentialResponse.credential });
      login(response.data);
      addToast('Đăng nhập Google thành công!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Google login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Render nút Google
  return (
    <div id="google_signin_button" className="mt-4"></div>
  );
}
```

## Troubleshooting

### Lỗi: "Google is not defined"
- Đảm bảo Google script đã được tải trong `index.html` hoặc `main.tsx`

### Lỗi: "Invalid client ID"
- Kiểm tra lại Client ID trong `.env.local`
- Đảm bảo JavaScript origins trùng với URL của bạn

### Lỗi: CORS
- Thêm CORS headers trong backend
- Đảm bảo frontend URL được authorized trong Google Console

## Tài liệu tham khảo

- [Google Sign-In Documentation](https://developers.google.com/identity/sign-in/web)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
