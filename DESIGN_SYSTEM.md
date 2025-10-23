# FinFlow Design System

## 🎨 Обязательные правила для всего проекта

### КРИТИЧНО: Это НЕ рекомендации, это ОБЯЗАТЕЛЬНЫЕ правила для КАЖДОЙ страницы без исключений!

---

## 📐 Типографика

### Шрифт
- **Primary**: Sofia Pro / SF UI Display
- **Fallback**: Inter, -apple-system, sans-serif

### Размеры (из Style Guide)
```
Heading 1: 24px, Bold (700)
Heading 2: 18px, Medium (500-600)
Heading 3: 14px, Regular (400)
Heading 4: 12px, Regular (400)
Body text: 14px+, Regular (400)
Минимум на мобилке: 14px
```

---

## 🎨 Цветовая палитра

### СТРОГО ТОЛЬКО ЭТИ 5 ЦВЕТОВ (Minimalism)
```css
/* Primary Colors - из Style Guide */
--cornflower-blue: #6C6FF9;   /* Основной синий - кнопки, акценты */
--maya-blue: #64C7F8;         /* Голубой - вторичные элементы */
--midnight-blue: #272B3E;     /* Темно-синий - текст, иконки */
--athens-gray: #EFF0F6;       /* Светло-серый - фоны */
--crystal-white: #FFFFFF;     /* Белый - карточки, элементы */

/* Применение */
--bg-main: #EFF0F6;           /* Фон страницы (Athens Gray) */
--bg-element: #FFFFFF;        /* Фон карточек (Crystal White) */
--text-primary: #272B3E;      /* Основной текст (Midnight Blue) */
--accent-primary: #6C6FF9;    /* Основной акцент (Cornflower Blue) */
--accent-secondary: #64C7F8;  /* Вторичный акцент (Maya Blue) */
```

---

## 💎 Минимализм (Minimalism)

### Тени (минимальные, плоские)
```css
/* Карточки */
box-shadow: 0 2px 8px rgba(39, 43, 62, 0.08);

/* Hover состояние */
box-shadow: 0 4px 12px rgba(39, 43, 62, 0.12);

/* Кнопки */
box-shadow: 0 1px 3px rgba(39, 43, 62, 0.1);
```

### Границы
```css
/* Тонкие линии вместо теней (опционально) */
border: 1px solid #EFF0F6;
```

---

## 🔧 Компоненты Design System

### Используй ТОЛЬКО эти компоненты:

```tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Container } from '@/components/ui/Container';
```

---

## 📱 Адаптивность

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Touch Targets (мобилка)
- Минимум: 44x44px
- Рекомендуемый: 48x48px

### Шрифты (адаптивные)
```
Mobile: 14px (body), 20px (h1)
Tablet: 16px (body), 24px (h1)
Desktop: 18px (body), 28px (h1)
```

---

## ❌ ЗАПРЕЩЕНО

- ❌ Цвета НЕ из палитры (только 5 цветов!)
- ❌ Градиенты
- ❌ Сложные тени (neumorphism)
- ❌ Текст меньше 14px
- ❌ `border-radius` больше 12px (минимализм!)
- ❌ Кастомные кнопки/инпуты
- ❌ Бургер-меню

---

## ✅ ОБЯЗАТЕЛЬНО

- ✅ Все страницы в `<Layout>`
- ✅ Весь контент в `<Container>`
- ✅ Только компоненты из `/ui/`
- ✅ Фон страницы: `#EFF0F6` (Athens Gray)
- ✅ Фон элементов: `#FFFFFF` (Crystal White)
- ✅ Минимальные плоские тени
- ✅ Адаптивность на всех экранах
- ✅ `border-radius`: 8-12px (чистый минимализм)

---

## 📦 Файловая структура

```
src/
├── components/
│   ├── ui/               ← ЕДИНСТВЕННЫЙ источник UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Text.tsx
│   │   └── Container.tsx
│   └── Layout.tsx
├── Budgets/theme/
│   └── theme.ts          ← MUI theme config
└── pages/
    └── ...               ← Используют только /ui компоненты
```

---

## 🎯 Примеры использования

### ✅ ПРАВИЛЬНО

```tsx
import { Container, Card, Text, Button } from '@/components/ui';

export default function MyPage() {
  return (
    <Container>
      <Card padding="lg">
        <Text variant="h1">Заголовок</Text>
        <Text variant="body">Описание</Text>
        <Button>Действие</Button>
      </Card>
    </Container>
  );
}
```

### ❌ НЕПРАВИЛЬНО

```tsx
// НЕ ДЕЛАЙ ТАК!
<div className="bg-white rounded-lg p-4 shadow-lg">
  <h1 className="text-2xl font-bold">Заголовок</h1>
  <button className="bg-blue-500 px-4 py-2">Кнопка</button>
</div>
```

---

## 📋 Чеклист для каждой страницы

```bash
□ Обернута в <Layout>
□ Контент в <Container>
□ Используются <Button>, <Input>, <Card>
□ Весь текст через <Text>
□ Фон страницы: bg-[#EFF0F6]
□ Фон элементов: bg-white
□ Минимальные тени (0 2px 8px)
□ border-radius: 8-12px (минимализм)
□ Адаптивность протестирована
□ Touch targets >= 44px
□ Шрифты >= 14px
```

---

## 🚀 Деплой

Перед каждым деплоем:

```bash
npm run lint
npm run build
npm run preview
```

Проверь на:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1440px)

---

**Никаких исключений! Все страницы должны следовать этим правилам!** ✨


