# Инструкции по деплою на Vercel

## Исправленные проблемы

### 1. Ошибка "React is not defined"
- ✅ Добавлен импорт React во все .tsx файлы
- ✅ Обновлена конфигурация Vite с `jsxInject`
- ✅ Исправлены файлы: App.tsx, Dashboard.tsx, Profile.tsx, OAuthCallback.tsx

### 2. Ошибка "Invalid Refresh Token"
- ✅ Добавлена обработка ошибок refresh token в useAuth.ts
- ✅ Автоматическая очистка недействительных токенов

## Переменные окружения для Vercel

Убедитесь, что в настройках проекта Vercel добавлены следующие переменные:

```
VITE_SUPABASE_URL=https://xaovmjspcvfzbefatqlo.supabase.co
VITE_SUPABASE_ANON_KEY=ваш_anon_key_здесь
```

## Команды для деплоя

1. Убедитесь, что все изменения закоммичены:
```bash
git add .
git commit -m "Fix React imports and Supabase auth issues"
git push
```

2. Деплой на Vercel:
- Vercel автоматически деплоит при push в main ветку
- Или используйте Vercel CLI: `vercel --prod`

## Проверка после деплоя

1. Откройте приложение в браузере
2. Проверьте консоль браузера на наличие ошибок
3. Попробуйте войти в систему
4. Проверьте, что все страницы загружаются корректно

## Дополнительные настройки

Если проблемы продолжаются, проверьте:
- Настройки CORS в Supabase
- Правильность URL в переменных окружения
- Настройки аутентификации в Supabase Dashboard
