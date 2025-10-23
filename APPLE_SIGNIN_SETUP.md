# 🍎 Настройка Sign in with Apple

## 📋 Требования

Для работы Sign in with Apple необходимо:
- ✅ Аккаунт Apple Developer (платный - $99/год)
- ✅ Настроенный Service ID в Apple Developer Console
- ✅ Настроенный Secret Key
- ✅ Callback URL зарегистрирован в Apple

## 🔧 Шаг 1: Создание App ID

1. Откройте [Apple Developer Console](https://developer.apple.com/account/)
2. Перейдите в **Certificates, Identifiers & Profiles**
3. Выберите **Identifiers** → **App IDs**
4. Нажмите кнопку **+** для создания нового App ID

### Параметры App ID:
- **Description**: FinFlow App
- **Bundle ID**: `com.yourcompany.finflow` (используйте ваш реальный)
- **Capabilities**: Включите **Sign in with Apple**

## 🔧 Шаг 2: Создание Service ID (для веба)

1. В том же разделе выберите **Services IDs**
2. Нажмите **+** для создания нового Service ID

### Параметры Service ID:
- **Description**: FinFlow Web
- **Identifier**: `com.yourcompany.finflow.web` (это будет ваш Client ID)
- **Sign in with Apple**: Включите и настройте

### Настройка Web Authentication:
1. Нажмите **Configure**
2. **Primary App ID**: Выберите созданный ранее App ID
3. **Domains and Subdomains**: 
   - Добавьте ваш домен (например: `finflow.app`)
   - Для Vercel: `your-app.vercel.app`
4. **Return URLs**: 
   ```
   https://xaovmjspcvfzbefatqlo.supabase.co/auth/v1/callback
   ```
5. Нажмите **Save** → **Continue** → **Register**

## 🔧 Шаг 3: Создание Secret Key

1. Перейдите в **Keys**
2. Нажмите **+** для создания нового ключа

### Параметры Key:
- **Key Name**: FinFlow Sign in with Apple Key
- **Sign in with Apple**: Включите
- **Configure**: Выберите ваш Primary App ID
- Нажмите **Continue** → **Register**
- **ВАЖНО**: Скачайте `.p8` файл - он показывается только один раз!
- Сохраните **Key ID** (10-символьный идентификатор)

## 🔧 Шаг 4: Генерация Secret для Supabase

Apple требует JWT токен как secret. Supabase делает это автоматически, но вам нужно предоставить данные.

### В Supabase Dashboard:

1. Откройте **Authentication** → **Providers** → **Apple**
2. Включите **Enable Sign in with Apple**
3. Заполните поля:

   **Client ID**: 
   ```
   com.yourcompany.finflow.web
   ```
   (ваш Service ID из Шага 2)

   **Secret Key (for OAuth)**:
   Нужно сгенерировать JWT токен. Используйте онлайн генератор или скрипт.

   #### Онлайн генератор:
   - Перейдите на [jwt.io](https://jwt.io)
   - Используйте этот payload:
     ```json
     {
       "iss": "TEAM_ID",
       "iat": 1234567890,
       "exp": 1234567890,
       "aud": "https://appleid.apple.com",
       "sub": "com.yourcompany.finflow.web"
     }
     ```
   - Замените `TEAM_ID` на ваш Team ID (находится в верхнем правом углу Apple Developer Console)
   - Замените timestamps (используйте текущий unix timestamp)
   - В секции Verify Signature используйте ваш `.p8` ключ

   #### Или используйте Node.js скрипт:
   ```javascript
   const jwt = require('jsonwebtoken');
   const fs = require('fs');

   const privateKey = fs.readFileSync('AuthKey_XXXXXXXXXX.p8');

   const token = jwt.sign({}, privateKey, {
     algorithm: 'ES256',
     expiresIn: '180d',
     audience: 'https://appleid.apple.com',
     issuer: 'YOUR_TEAM_ID',
     subject: 'com.yourcompany.finflow.web',
     keyid: 'YOUR_KEY_ID'
   });

   console.log(token);
   ```

4. **Callback URL (for OAuth)**: 
   ```
   https://xaovmjspcvfzbefatqlo.supabase.co/auth/v1/callback
   ```
   (уже заполнен автоматически)

5. Нажмите **Save**

## 🔧 Шаг 5: Настройка в приложении

✅ Уже готово! Код обновлен:
- Кнопка "Продолжить с Apple" добавлена
- OAuth flow настроен
- Обработка callback реализована

## 📱 Тестирование

### Веб (OAuth):
1. Откройте приложение
2. Перейдите на страницу входа
3. Нажмите **"Продолжить с Apple"**
4. Войдите с вашим Apple ID
5. Разрешите доступ
6. Вы будете перенаправлены обратно в приложение

### Важные замечания:
- ⚠️ **Secret keys expire every 6 months** - не забудьте обновить!
- 🔒 Apple может не предоставить email при первом входе (если пользователь выбрал "Hide My Email")
- 📧 Включите в Supabase: **Allow users without an email** = true

## 🐛 Troubleshooting

### Ошибка: "invalid_client"
- Проверьте, что Client ID совпадает с Service ID
- Проверьте, что Secret Key актуален (не истёк)

### Ошибка: "invalid_request"
- Убедитесь, что Callback URL правильно зарегистрирован в Apple
- Проверьте домены в Service ID

### Email не приходит
- Apple позволяет пользователям скрывать email
- Включите **"Allow users without an email"** в Supabase
- Используйте `user.id` вместо email как уникальный идентификатор

### Redirect не работает
- Проверьте Return URLs в Apple Developer Console
- Убедитесь, что используете правильный Callback URL от Supabase

## 📊 Полезные ссылки

- [Apple Developer Console](https://developer.apple.com/account/)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Supabase Apple OAuth Guide](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [JWT.io Token Generator](https://jwt.io)

## 🔄 Обновление Secret Key (каждые 6 месяцев)

1. Сгенерируйте новый Key в Apple Developer Console
2. Скачайте `.p8` файл
3. Создайте новый JWT токен
4. Обновите в Supabase Dashboard → Authentication → Providers → Apple
5. Нажмите **Save**

**Установите напоминание в календаре на обновление через 5 месяцев!** ⏰

