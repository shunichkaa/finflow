# 📘 Пошаговая настройка Supabase для FinFlow

## 🎯 Что мы настроим

✅ Таблицы для хранения транзакций, бюджетов и целей  
✅ Row Level Security (RLS) для защиты данных  
✅ Автоматическую синхронизацию между устройствами

---

## 📋 Шаг 1: Откройте Supabase Dashboard

1. Перейдите на [https://supabase.com](https://supabase.com)
2. Нажмите **Sign in** (или **Start your project**, если еще не зарегистрированы)
3. Войдите через GitHub (рекомендуется) или Email

---

## 📋 Шаг 2: Выберите или создайте проект

### Если у вас УЖЕ есть проект:
1. В Dashboard нажмите на название вашего проекта (например, `finflow`)
2. Перейдите к **Шагу 3**

### Если проекта НЕТ:
1. Нажмите **New project** (зеленая кнопка)
2. Заполните форму:
   - **Name**: `finflow` (или любое название)
   - **Database Password**: придумайте сложный пароль (сохраните его!)
   - **Region**: выберите ближайший регион (например, `Europe (Frankfurt)`)
   - **Pricing Plan**: выберите **Free** (бесплатный)
3. Нажмите **Create new project**
4. Подождите 1-2 минуты, пока проект создается

---

## 📋 Шаг 3: Откройте SQL Editor

1. В левом меню найдите и нажмите **SQL Editor** (иконка `</>`)
2. Нажмите **New query** (или `+ New query`)
3. Откроется пустой редактор SQL

---

## 📋 Шаг 4: Вставьте SQL-скрипт

1. Откройте файл `supabase_migration.sql` в вашем проекте
2. Скопируйте **ВСЁ** содержимое файла (Ctrl+A → Ctrl+C)
3. Вставьте в SQL Editor в Supabase (Ctrl+V)

Содержимое должно начинаться с:
```sql
-- FinFlow Cloud Sync Tables Migration
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
...
```

---

## 📋 Шаг 5: Запустите SQL-скрипт

1. Убедитесь, что весь код вставлен
2. Нажмите **RUN** (зеленая кнопка в правом нижнем углу)
3. Подождите 2-3 секунды

### ✅ Успех!
Если всё прошло успешно, внизу появится:
```
Success. No rows returned
```

### ❌ Ошибка?
Если видите ошибку:
- Проверьте, что скопировали **весь** файл `supabase_migration.sql`
- Убедитесь, что не добавили лишних символов
- Попробуйте еще раз: **New query** → вставьте код → **RUN**

---

## 📋 Шаг 6: Проверьте созданные таблицы

1. В левом меню нажмите **Table Editor** (иконка таблицы)
2. Вы должны увидеть **3 новые таблицы**:
   - ✅ `transactions` (транзакции)
   - ✅ `budgets` (бюджеты)
   - ✅ `goals` (цели)

### Нажмите на каждую таблицу и проверьте:

#### 📊 Таблица `transactions`
Столбцы (columns):
- `id` (uuid, primary key)
- `user_id` (uuid)
- `type` (text)
- `amount` (numeric)
- `category` (text)
- `description` (text)
- `date` (timestamp with time zone)
- `tags` (text[])
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)

#### 💰 Таблица `budgets`
Столбцы:
- `id` (uuid, primary key)
- `user_id` (uuid)
- `category` (text)
- `limit_amount` (numeric)
- `period` (text)
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)

#### 🎯 Таблица `goals`
Столбцы:
- `id` (uuid, primary key)
- `user_id` (uuid)
- `name` (text)
- `target_amount` (numeric)
- `current_amount` (numeric)
- `deadline` (timestamp with time zone)
- `icon` (text)
- `is_completed` (boolean)
- `created_at` (timestamp with time zone)
- `updated_at` (timestamp with time zone)

---

## 📋 Шаг 7: Проверьте RLS (Row Level Security)

1. В **Table Editor** нажмите на таблицу `transactions`
2. Вверху найдите кнопку с замочком **RLS** — должна быть **ЗЕЛЕНОЙ** (включена)
3. Повторите для `budgets` и `goals`

### Если RLS НЕ включен (красная кнопка):
1. Нажмите на красную кнопку **RLS**
2. В появившемся окне нажмите **Enable RLS**
3. Повторите для всех 3 таблиц

---

## 📋 Шаг 8: Проверьте Policies (Правила доступа)

1. В **Table Editor** нажмите на таблицу `transactions`
2. Перейдите на вкладку **Policies** (вверху)
3. Вы должны увидеть **4 политики**:
   - ✅ `Users can view own transactions` (SELECT)
   - ✅ `Users can insert own transactions` (INSERT)
   - ✅ `Users can update own transactions` (UPDATE)
   - ✅ `Users can delete own transactions` (DELETE)

4. Повторите проверку для `budgets` и `goals` (по 4 политики в каждой)

### Если политик НЕТ:
Вернитесь к **Шагу 4** и запустите SQL-скрипт еще раз.

---

## 📋 Шаг 9: Проверьте настройки аутентификации

### Google OAuth (если используете вход через Google):

1. В левом меню нажмите **Authentication** → **Providers**
2. Найдите **Google** в списке
3. Убедитесь, что переключатель **Enabled** (включен)
4. Проверьте, что заполнены:
   - ✅ **Client ID** (из Google Cloud Console)
   - ✅ **Client Secret** (из Google Cloud Console)

### Email/Password:

1. В **Authentication** → **Providers**
2. Найдите **Email** в списке
3. Убедитесь, что переключатель **Enabled** (включен)

---

## 📋 Шаг 10: Скопируйте API ключи (если еще не сделали)

1. В левом меню нажмите **Project Settings** (иконка шестеренки внизу)
2. Перейдите в **API**
3. Скопируйте:
   - **Project URL** (например, `https://xyzcompany.supabase.co`)
   - **anon public** ключ (начинается с `eyJhbGc...`)

4. Вставьте их в файл `.env` вашего проекта:
```env
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 📋 Шаг 11: Перезапустите приложение

1. Остановите dev-сервер (Ctrl+C в терминале)
2. Запустите снова:
```bash
npm run dev
```

---

## 📋 Шаг 12: Проверьте синхронизацию

1. Откройте приложение в браузере
2. Войдите в аккаунт (Google или Email)
3. Перейдите в **Профиль** (иконка человечка)
4. Найдите раздел **Синхронизация**
5. Включите переключатель **"Облачная синхронизация"**

### ✅ Успех!
Если всё работает, вы увидите:
- Статус: `Последняя синхронизация: 12:34:56`
- Кнопка **Sync** (для ручной синхронизации)

### ❌ Ошибка "Sync failed"?

Откройте консоль браузера (F12):
1. Перейдите на вкладку **Console**
2. Посмотрите ошибку (обычно красным текстом)

**Частые проблемы:**

#### 1. `relation "transactions" does not exist`
**Решение**: Таблицы не созданы. Вернитесь к **Шагу 4** и запустите SQL-скрипт.

#### 2. `new row violates row-level security policy`
**Решение**: RLS включен, но политики не созданы. Вернитесь к **Шагу 8**.

#### 3. `No API key found`
**Решение**: API ключи не заполнены. Вернитесь к **Шагу 10**.

#### 4. `Invalid login credentials`
**Решение**: Выйдите и войдите заново в аккаунт.

---

## 🎉 Готово! Что дальше?

Теперь вы можете:
1. ✅ **Добавлять транзакции** — они автоматически сохранятся в облако
2. ✅ **Создавать бюджеты** — доступны на всех устройствах
3. ✅ **Ставить цели** — синхронизируются каждые 30 секунд
4. ✅ **Войти на другом устройстве** — все данные загрузятся автоматически

---

## 📊 Как проверить данные в Supabase?

1. Перейдите в **Table Editor** → `transactions`
2. Вы увидите все ваши транзакции в виде таблицы
3. Можете редактировать/удалять данные прямо здесь

---

## 🔐 Безопасность

### ✅ Ваши данные защищены:
- Каждый пользователь видит только свои данные (RLS)
- Все запросы идут через HTTPS
- Supabase не имеет доступа к вашим данным (end-to-end encryption)

### 🔒 Что НЕ нужно делать:
- ❌ Не отключайте RLS
- ❌ Не удаляйте политики (Policies)
- ❌ Не публикуйте API ключи в публичных репозиториях

---

## 💡 Полезные советы

### 1. Резервное копирование данных
В Supabase Dashboard:
1. **Database** → **Backups**
2. Настройте автоматические бэкапы (доступно на платных тарифах)

### 2. Мониторинг использования
1. **Project Settings** → **Usage**
2. Проверяйте использование базы данных (Free tier: 500 MB)

### 3. Логи ошибок
1. **Logs** → **Postgres Logs**
2. Смотрите все SQL-запросы и ошибки

---

## 📞 Нужна помощь?

- 📖 [Документация Supabase](https://supabase.com/docs)
- 💬 [Discord сообщество](https://discord.supabase.com)
- 🐛 [GitHub Issues](https://github.com/supabase/supabase/issues)

---

**Автор**: FinFlow Team  
**Последнее обновление**: 2025  
**Версия**: 1.0

---

## ✅ Чеклист для проверки

- [ ] Проект создан в Supabase
- [ ] SQL-скрипт запущен без ошибок
- [ ] 3 таблицы созданы (transactions, budgets, goals)
- [ ] RLS включен для всех 3 таблиц (зеленая кнопка)
- [ ] 12 политик созданы (по 4 на каждую таблицу)
- [ ] API ключи скопированы в `.env`
- [ ] Приложение перезапущено
- [ ] Синхронизация работает (статус "Последняя синхронизация: ...")
- [ ] Данные появляются в Supabase Table Editor

**Если все галочки проставлены — поздравляем, настройка завершена! 🎉**

