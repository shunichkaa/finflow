# Исправление ошибки с эмодзи в копилках

## Проблема
После переключения на темную тему возникали ошибки:
```
InvalidCharacterError: Failed to execute 'createElement' on 'Document': The tag name provided ('🚗') is not a valid name.
```

## Причина
Старые данные в localStorage и Supabase содержали эмодзи напрямую в поле `icon` вместо идентификаторов (например, '🚗' вместо 'car').

## Решение

### 1. Автоматическая миграция
Добавлена автоматическая миграция данных при загрузке приложения:
- **migrationHelpers.ts** - утилиты для преобразования эмодзи в ID
- **useGoalsStore** - миграция при загрузке из localStorage (версия 2)
- **useCloudSync** - миграция при загрузке из Supabase
- **clearOldData.ts** - очистка поврежденных данных при запуске

### 2. Маппинг эмодзи → ID
```typescript
{
    '✈': 'travel', '✈️': 'travel',
    '🏠': 'home', '🚗': 'car', '📚': 'education',
    '💍': 'wedding', '💻': 'laptop', '💎': 'jewelry',
    '💰': 'savings', '🏖': 'vacation', '🏖️': 'vacation',
    '📱': 'phone', '📷': 'camera', '💪': 'fitness',
    '🎁': 'gift', '🎵': 'music', '🎨': 'art', '📖': 'book',
}
```

### 3. Для пользователей

Если ошибка все еще возникает:

1. **Очистить localStorage:**
   ```javascript
   // В консоли браузера (F12)
   localStorage.removeItem('goals-storage');
   location.reload();
   ```

2. **Пересинхронизировать данные:**
   - Выйти из аккаунта
   - Войти снова
   - Данные автоматически загрузятся с миграцией

## Технические детали

### Файлы изменены:
- `src/Budgets/utils/migrationHelpers.ts` - новый файл
- `src/Budgets/utils/clearOldData.ts` - новый файл
- `src/Budgets/store/useGoalsStore.ts` - добавлена миграция
- `src/Budgets/hooks/useCloudSync.ts` - добавлена миграция при загрузке
- `src/BudgetList/pages/Goals.tsx` - добавлен fallback с миграцией
- `src/main.tsx` - автоматическая очистка старых данных

### Защита на всех уровнях:
1. ✅ При загрузке приложения (clearOldData)
2. ✅ При загрузке из localStorage (useGoalsStore migrate)
3. ✅ При загрузке из Supabase (useCloudSync)
4. ✅ При установке целей через setGoals
5. ✅ При рендере компонента (Goals.tsx)

## Деплой
После деплоя новой версии проблема должна исчезнуть автоматически для всех пользователей.
