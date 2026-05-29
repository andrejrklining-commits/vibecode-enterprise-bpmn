# VibeCode Enterprise BPMN System

Современное enterprise web-приложение для управления бизнес-процессами в Bitrix24.

## Функциональность

### 🎯 Основные возможности
- 📊 BPMN 2.0 визуальный редактор
- 📚 Knowledge Base система
- 👥 Управление ролями и должностями
- 🏢 Организационная структура
- 🔗 Граф связей между сущностями
- 📈 Аналитика и мониторинг
- 🤖 AI-функции
- 🌓 Dark/Light mode

### 📋 Управление процессами
- Описание и моделирование BPMN-схем
- Версионирование и история изменений
- Связи между процессами
- KPI и SLA мониторинг
- Регламенты и инструкции

### 💡 Knowledge Base
- Хранение инструкций
- Версионирование документов
- Полнотекстовый поиск
- AI-powered поиск
- Markdown и Rich Text редакторы

### 👥 Управление персоналом
- Роли и должности
- Матрица RACI
- Зоны ответственности
- Автоматическая генерация инструкций

## Технологический стек

- **Frontend**: Vue 3 + TypeScript
- **UI Framework**: Tailwind CSS + DaisyUI
- **BPMN Editor**: bpmn-js
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Backend**: Bitrix24 Smart Processes + REST API

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/andrejrklining-commits/vibecode-enterprise-bpmn.git
cd vibecode-enterprise-bpmn

# Установка зависимостей
npm install

# Создание .env файла
cp .env.example .env
```

## Разработка

```bash
# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Preview production build
npm run preview
```

## Развертывание

```bash
# Сборка приложения
npm run build

# Deploy на сервер
# Скопируйте содержимое папки dist на ваш сервер
```

## Docker

```bash
# Сборка образа
docker build -t vibecode-enterprise .

# Запуск контейнера
docker run -p 80:3000 vibecode-enterprise
```

## Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── BPMN/           # BPMN редактор
│   ├── KnowledgeBase/  # Knowledge Base
│   ├── Processes/      # Управление процессами
│   ├── Roles/          # Роли и должности
│   ├── Departments/    # Подразделения
│   └── Common/         # Общие компоненты
├── stores/             # Pinia stores
├── api/                # API интеграция
├── types/              # TypeScript типы
├── utils/              # Утилиты
├── styles/             # Глобальные стили
├── App.vue             # Главный компонент
└── main.ts             # Точка входа
```

## API Интеграция

Приложение использует Bitrix24 REST API для:
- Аутентификации
- Синхронизации данных
- Smart Processes интеграции
- Управления документами

## Функции

### BPMN Редактор
- ✅ Drag-and-drop элементы
- ✅ Gateway, Events, Tasks
- ✅ Swimlanes и подпроцессы
- ✅ Zoom/Pan и Minimap
- ✅ Автосохранение
- ✅ Версионность схем

### Knowledge Base
- ✅ Хранение инструкций
- ✅ Версионирование
- ✅ Полнотекстовый поиск
- ✅ Markdown редактор
- ✅ Вложения и видео

### Аналитика
- ✅ Dashboard метрик
- ✅ Heatmap использования
- ✅ Процессы без KPI
- ✅ Устаревшие инструкции
- ✅ Активность пользователей

## Поддержка

Для вопросов и поддержки свяжитесь с командой разработки.

## Лицензия

MIT
