# 🍎 Quick Setup Guide - Sign in with Apple

## ✅ Что уже сделано в коде:

- ✅ Кнопка "Продолжить с Apple" добавлена на страницу входа
- ✅ OAuth flow настроен через Supabase
- ✅ Обработка callback реализована
- ✅ Иконка Apple добавлена

## 🚀 Что нужно сделать (5 минут):

### 1. В Supabase Dashboard:

1. Откройте: **Authentication** → **Providers** → **Apple**
2. Включите: **Enable Sign in with Apple** ✅
3. Заполните поля, которые у вас уже есть:

```
Client IDs: shunichkaa's Project
Secret Key (for OAuth): •••••••••••••••
```

4. Убедитесь, что включено:
   - ✅ **Allow users without an email** (если Apple не даст email)

5. **Callback URL** уже правильный:
   ```
   https://xaovmjspcvfzbefatqlo.supabase.co/auth/v1/callback
   ```

6. Нажмите **Save**

### 2. В Apple Developer Console:

Если ещё не настроили, убедитесь что:

1. **Service ID** → **Web Authentication** → **Return URLs** содержит:
   ```
   https://xaovmjspcvfzbefatqlo.supabase.co/auth/v1/callback
   ```

2. **Domains** содержит ваш домен приложения

### 3. Готово! 🎉

Теперь пользователи могут войти через Apple:
- Кнопка появится на странице `/login`
- Работает на веб, iOS, macOS
- Email может быть скрыт (Apple Privacy)

## 📊 Как выглядит:

**Страница входа теперь имеет:**
1. 🔵 Продолжить с Google
2. 🍎 Продолжить с Apple  ← **Новая кнопка!**
3. ✉️ Email/Password форма

## ⚠️ Важно помнить:

1. **Secret key истекает через 6 месяцев** - обновите в январе 2025!
2. Установите напоминание в календаре ⏰
3. Некоторые пользователи могут скрыть email - это нормально

## 🐛 Если не работает:

1. Проверьте в Supabase Logs: **Authentication** → **Logs**
2. Проверьте Browser Console (F12) на ошибки
3. Убедитесь что Secret key актуален (не expired)
4. Callback URL должен совпадать в Apple и Supabase

---

**Полная документация**: См. `APPLE_SIGNIN_SETUP.md` для детальных инструкций

