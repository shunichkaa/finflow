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

### Основные цвета (ТОЛЬКО эти!) - из Style Guide
```css
/* Primary Colors */
--cornflower-blue: #6C6FF9;   /* Основной синий */
--maya-blue: #64C7F8;         /* Голубой */
--midnight-blue: #272B3E;     /* Темно-синий (текст) */
--athens-gray: #EFF0F6;       /* Светло-серый */
--crystal-white: #FFFFFF;     /* Белый */

/* Дополнительные */
--light-blue: #6B92E5;        /* для графиков */
--purple: #7B81BE;            /* акценты */
--pink: #F88ABO;              /* розовый */
--turquoise: #67D4D4;         /* бирюзовый */
--mint: #6BC5A4;              /* мятный */

/* Фоны (ПРАВИЛЬНЫЕ из Style Guide!) */
--bg-main: #F5F6FA;           /* ОСНОВНОЙ фон страницы */
--bg-element: #FFFFFF;        /* фон карточек/элементов */
--bg-hover: #FAFBFC;          /* hover */

/* Текст */
--text-primary: #272B3E;      /* Midnight Blue */
--text-secondary: #8F9BB3;    /* вторичный */
--text-disabled: #C5CEE0;     /* неактивный */
```

---

## 💎 Neumorphism (из Style Guide)

### Bottom Layer (светлая тень)
```css
X: -10px
Y: -10px
Blur: 24px
Opacity: 70%
Color: #A6B4C8
```

### Top Layer (белая тень)
```css
X: -12px
Y: -12px
Blur: 20px
Opacity: 80%
Color: #FFFFFF
```

### Для кода:
```css
/* Raised (выпуклые) */
box-shadow: 
  -10px -10px 20px rgba(255, 255, 255, 0.8),
  10px 10px 20px rgba(174, 174, 192, 0.4);

/* Inset (вдавленные) */
box-shadow: 
  inset -5px -5px 10px rgba(255, 255, 255, 0.5),
  inset 5px 5px 10px rgba(174, 174, 192, 0.5);
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

- ❌ `border: 1px solid ...` (только shadows!)
- ❌ Цвета не из палитры
- ❌ Текст меньше 14px
- ❌ `border-radius` меньше 16px
- ❌ Чистый белый (#FFFFFF) или черный (#000000)
- ❌ Кастомные кнопки/инпуты
- ❌ Бургер-меню

---

## ✅ ОБЯЗАТЕЛЬНО

- ✅ Все страницы в `<Layout>`
- ✅ Весь контент в `<Container>`
- ✅ Только компоненты из `/ui/`
- ✅ Фон страницы: `#F5F6FA` (из Style Guide!)
- ✅ Фон элементов: `#FFFFFF` (белый)
- ✅ Neumorphic тени везде
- ✅ Адаптивность на всех экранах
- ✅ Минимум 16px `border-radius`

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
□ Фон страницы: bg-[#F5F6FA]
□ Фон элементов: bg-white
□ Нет border, только shadows
□ Все border-radius >= 16px
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


