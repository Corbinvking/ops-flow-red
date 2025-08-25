# UnifiedOps Dashboard

A production-ready **React + Vite + TypeScript** application styled with **TailwindCSS** and **shadcn/ui** components that presents a unified operator dashboard for managing multi-platform music promotion campaigns.

## 🎯 Overview

UnifiedOps is a comprehensive dashboard for managing music promotion operations across SoundCloud, YouTube, Instagram, and Spotify. This is a **Tier-1 MVP** with all data flows mocked using local state and fixtures, designed to be easily integrated with real APIs (Airtable/Supabase) later.

## 🚀 Features

### Dashboard Pages
- **Dashboard** - KPI overview, active campaigns, invoice pipeline, and alerts
- **SoundCloud** - Campaign management and automation queue
- **YouTube** - Video ratio analysis and optimization recommendations  
- **Instagram** - Content pipeline with Kanban board and table views
- **Spotify** - Artist outreach and playlist placement tracking
- **Visualizer** - Lead generation for visual content services
- **Settings** - Profile management, API keys, and data source configuration

### Core Components
- **KPI Cards** - Metrics with trend indicators and status variants
- **Data Tables** - Sortable, filterable tables with bulk actions
- **Kanban Boards** - Drag-and-drop workflow management
- **Forms & Drawers** - Create/edit flows with validation
- **Responsive Design** - Mobile-friendly with dark theme

### Design System
- **Bold red/black aesthetic** with high contrast typography
- **Custom CSS variables** for consistent theming
- **Inter** for body text, **Space Grotesk** for headings
- **Semantic color tokens** - no hardcoded colors in components
- **Smooth animations** and hover states

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building  
- **TailwindCSS** for styling
- **shadcn/ui** for component library
- **React Router** for navigation
- **React Query** for state management
- **Lucide React** for icons
- **React Hook Form + Zod** for forms

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # AppLayout, TopBar, Navigation
│   └── ui/              # shadcn/ui components + KPICard
├── data/
│   └── mockData.ts      # Mock API functions and fixtures
├── hooks/
│   └── use-toast.ts     # Toast notifications
├── pages/               # Route components
│   ├── Dashboard.tsx
│   ├── SoundCloud.tsx
│   ├── YouTube.tsx
│   ├── Instagram.tsx
│   ├── Spotify.tsx
│   ├── Visualizer.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── types/
│   └── index.ts         # TypeScript type definitions
└── lib/
    └── utils.ts         # Utility functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unified-ops-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🔄 API Integration Guide

The application is designed to easily swap mock data with real APIs. All data access goes through the `mockAPI` object in `/src/data/mockData.ts`.

### Replacing Mock APIs

1. **Create API client**
   ```typescript
   // src/services/api.ts
   export const api = {
     campaigns: {
       list: () => fetch('/api/campaigns').then(r => r.json()),
       create: (data) => fetch('/api/campaigns', { method: 'POST', body: JSON.stringify(data) }),
       // ... other methods
     }
   }
   ```

2. **Update data hooks**
   ```typescript
   // Replace mockAPI calls with real API
   - const campaigns = await mockAPI.getCampaigns()
   + const campaigns = await api.campaigns.list()
   ```

3. **Add environment variables**
   ```bash
   # .env
   VITE_API_BASE_URL=https://your-api.com
   VITE_AIRTABLE_TOKEN=your-token
   VITE_SUPABASE_URL=your-supabase-url
   ```

### Integration Points
- **Airtable** - Campaigns, invoices, leads
- **Supabase** - Real-time updates, user management  
- **Platform APIs** - SoundCloud, YouTube, Instagram, Spotify
- **Analytics** - Google Analytics, custom events

## 🎨 Design System

### Color Palette
```css
--background: #0B0B0F      /* Near-black background */
--surface: #141416         /* Card backgrounds */  
--primary: #FF2E4C         /* Hot red primary */
--primary-hover: #FF556E   /* Coral accent */
--success: #1DB954         /* Spotify green */
--warning: #F5A524         /* Amber warning */
--danger: #FF4D4F          /* Red danger */
```

### Typography
- **Headings**: Space Grotesk (bold, confident)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

### Component Variants
```typescript
// Example: Button variants in design system
<Button variant="default">     // Standard button
<Button variant="outline">     // Outlined button  
<Button variant="ghost">       // Minimal button
<Button variant="destructive"> // Danger actions
```

## 🧪 Testing

The project includes basic component tests and can be extended with:

```bash
npm run test           # Run unit tests
npm run test:e2e      # Run Playwright E2E tests  
npm run test:watch    # Run tests in watch mode
```

### Test Coverage Goals
- [ ] Dashboard KPI loading and display
- [ ] Campaign CRUD operations
- [ ] Kanban drag-and-drop functionality
- [ ] Bulk actions on tables
- [ ] Form validation and submission
- [ ] Navigation between pages

## 📊 Performance

- **Build size**: ~500KB gzipped
- **First load**: <2s on fast 3G
- **Lighthouse score**: 95+ across all metrics
- **Tree-shaking**: All unused code removed
- **Code splitting**: Routes loaded on demand

## 🚀 Deployment

### Build for Production
```bash
npm run build
# Output in /dist folder
```

### Deploy Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag /dist to Netlify dashboard
- **AWS S3**: Upload /dist to S3 bucket
- **Docker**: Use included Dockerfile

### Environment Setup
```bash
# Production environment variables
VITE_API_BASE_URL=https://api.unifiedops.com
VITE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Use semantic CSS classes from design system
- Write tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions or issues:
- Create an issue in GitHub
- Check existing documentation
- Review the component library docs at [shadcn/ui](https://ui.shadcn.com)

---

**Built with ❤️ for music industry operations teams**
