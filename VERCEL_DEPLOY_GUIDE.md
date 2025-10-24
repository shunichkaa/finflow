# 🚀 Гайд по деплою FinFlow на Vercel

## ⚠️ ВАЖНО: Настройка переменных окружения

### Шаг 1: Добавьте переменные в Vercel

Перед деплоем **обязательно** добавьте переменные окружения в Vercel:

1. Откройте ваш проект на [vercel.com](https://vercel.com)
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте следующие переменные:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Где взять эти данные:**
- Откройте [Supabase Dashboard](https://app.supabase.com)
- Выберите ваш проект
- Перейдите в **Settings** → **API**
- Скопируйте:
  - **Project URL** → `VITE_SUPABASE_URL`
  - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## 🔄 Варианты деплоя

### Вариант 1: Через GitHub (Рекомендуется)

#### 1. Закоммитьте изменения:
```bash
git add .
git commit -m "fix: исправлены критические ошибки и добавлена защита env"
git push origin main
```

#### 2. Vercel автоматически создаст новый деплой

---

### Вариант 2: Через Vercel CLI

#### 1. Установите Vercel CLI:
```bash
npm i -g vercel
```

#### 2. Залогиньтесь:
```bash
vercel login
```

#### 3. Деплой:
```bash
vercel --prod
```

---

### Вариант 3: Вручную через Dashboard

#### 1. Соберите проект локально:
```bash
npm run build
```

#### 2. Загрузите на Vercel:
- Откройте [vercel.com/new](https://vercel.com/new)
- Перетащите папку `dist` или выберите репозиторий
- Настройте переменные окружения
- Нажмите **Deploy**

---

## 🔧 Исправление текущей ошибки 404

### Причина ошибки:
```
404: NOT_FOUND
Code: DEPLOYMENT_NOT_FOUND
ID: fra1::xs7dd-1761310281800-9a750b774007
```

Это означает, что деплоймент был удален или не существует.

### Решение:

#### 1. Проверьте статус на Vercel:
- Откройте [vercel.com/dashboard](https://vercel.com/dashboard)
- Найдите ваш проект **finflow**
- Посмотрите последние деплойменты

#### 2. Если проект существует, но деплой старый:
```bash
# Сделайте новый деплой
vercel --prod
```

#### 3. Если проекта нет:
```bash
# Создайте новый проект
vercel
```

---

## ✅ Проверка после деплоя

### 1. Проверьте переменные окружения:
- Откройте деплой в браузере
- Откройте Console (F12)
- Не должно быть ошибок про Supabase URL/Key

### 2. Проверьте билд:
```bash
# Локально протестируйте билд
npm run build
npm run preview
```

### 3. Проверьте логи на Vercel:
- Откройте ваш деплой на Vercel
- Перейдите в **Deployments** → выберите последний
- Посмотрите **Build Logs** на наличие ошибок

---

## 🐛 Типичные проблемы

### Проблема 1: "Missing Supabase environment variables"
**Решение:** Добавьте переменные в Vercel Settings → Environment Variables

### Проблема 2: Build fails with peer dependency errors
**Решение:** Проверьте, что в `vercel.json` используется `--legacy-peer-deps`
```json
{
  "buildCommand": "npm run vercel-build"
}
```

### Проблема 3: Routes не работают (404 на /dashboard и др.)
**Решение:** Проверьте `vercel.json` - должен быть rewrite:
```json
{
  "rewrites": [
    {
      "source": "/((?!assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### Проблема 4: Assets не загружаются
**Решение:** Проверьте что `_headers` файл копируется в dist
```bash
cp public/_headers dist/_headers
```

---

## 📋 Чеклист перед деплоем

- [ ] `.env` файл добавлен в `.gitignore` ✅
- [ ] Переменные добавлены в Vercel Dashboard
- [ ] `npm run build` работает локально без ошибок
- [ ] `npm run lint` не выдает критических ошибок ✅
- [ ] Все изменения закоммичены в Git
- [ ] Supabase RLS политики настроены правильно
- [ ] Миграции выполнены в Supabase

---

## 🎯 Быстрый деплой (после всех исправлений)

```bash
# 1. Проверьте что всё работает локально
npm run build

# 2. Закоммитьте изменения
git add .
git commit -m "fix: исправлены ошибки проекта"
git push origin main

# 3. Если используете Vercel CLI
vercel --prod

# 4. Если через GitHub - деплой произойдет автоматически
```

---

## 🔗 Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase + Vercel Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 💡 Совет

После деплоя откройте браузер в режиме инкогнито, чтобы избежать проблем с кэшем.

**Удачи с деплоем! 🚀**

