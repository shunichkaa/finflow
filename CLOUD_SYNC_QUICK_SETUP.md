# 🔄 Быстрая настройка облачной синхронизации

## ✅ Что уже сделано

1. ✅ Код синхронизации готов (`useCloudSync.ts`)
2. ✅ UI интегрирован (Profile → Синхронизация)
3. ✅ Stores обновлены (`setTransactions`, `setBudgets`, `setGoals`)
4. ✅ SQL миграция готова (`supabase_migration.sql`)

## 🚀 Что нужно сделать (5 минут)

### Шаг 1: Создайте таблицы в Supabase

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard/project/_/sql/new)
2. Вставьте содержимое файла `supabase_migration.sql`
3. Нажмите **Run** (запустить)

### Шаг 2: Проверьте создание таблиц

В Supabase Dashboard → **Table Editor** должны появиться 3 таблицы:
- ✅ `transactions`
- ✅ `budgets`
- ✅ `goals`

### Шаг 3: Включите синхронизацию в приложении

1. Войдите в аккаунт (Google или Email)
2. Перейдите в **Профиль** → **Синхронизация**
3. Включите переключатель **"Облачная синхронизация"**

## 🎉 Готово!

Теперь:
- ✅ Данные сохраняются в облако каждые 30 секунд
- ✅ При входе на другом устройстве — все данные загружаются
- ✅ Можно нажать кнопку **Sync** для ручной синхронизации

## ❌ Если появляется ошибка "Sync failed"

Проверьте:
1. Таблицы созданы в Supabase (см. Шаг 2)
2. RLS (Row Level Security) включен для всех 3 таблиц
3. Policies созданы (см. `supabase_migration.sql`)
4. Вы авторизованы в приложении (session.user.id существует)

## 📊 Структура данных

### Transactions (Транзакции)
```sql
- id (UUID)
- user_id (UUID) → auth.users
- type (TEXT) → 'income' | 'expense'
- amount (NUMERIC)
- category (TEXT)
- description (TEXT)
- date (TIMESTAMP)
- tags (TEXT[])
```

### Budgets (Бюджеты)
```sql
- id (UUID)
- user_id (UUID) → auth.users
- category (TEXT)
- limit_amount (NUMERIC)
- period (TEXT) → 'weekly' | 'monthly'
```

### Goals (Цели)
```sql
- id (UUID)
- user_id (UUID) → auth.users
- name (TEXT)
- target_amount (NUMERIC)
- current_amount (NUMERIC)
- deadline (TIMESTAMP)
- icon (TEXT)
- is_completed (BOOLEAN)
```

## 🔐 Безопасность

- ✅ Row Level Security (RLS) включен
- ✅ Каждый пользователь видит только свои данные
- ✅ Автоматическая привязка к `auth.uid()`

## 📝 Полезные команды

### Проверить синхронизацию в консоли браузера:
```javascript
// Проверить статус
console.log(useCloudSync.getState().status);

// Принудительная синхронизация
useCloudSync.getState().syncNow();
```

### Очистить все данные пользователя (Supabase SQL):
```sql
DELETE FROM transactions WHERE user_id = auth.uid();
DELETE FROM budgets WHERE user_id = auth.uid();
DELETE FROM goals WHERE user_id = auth.uid();
```

---

**Автор**: FinFlow Team  
**Дата**: 2025  
**Версия**: 1.0

