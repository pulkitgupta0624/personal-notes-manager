# 📝 Notes & Bookmarks Manager - Frontend

Modern, responsive React application built with Next.js 14 and Tailwind CSS for managing personal notes and bookmarks.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Backend API running on `http://localhost:5000`

### Installation

1. **Install dependencies**
```bash
   npm install
```

2. **Configure environment variables**
```bash
   cp .env.local.example .env.local
```
   
   Edit `.env.local`:
```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Run the development server**
```bash
   npm run dev
```

4. **Open your browser**
```
   http://localhost:3000
```

## 📦 Build for Production
```bash
npm run build
npm start
```

## 🎨 Features

### Notes Management
- ✅ Create, read, update, delete notes
- ✅ Rich text content support
- ✅ Tag organization
- ✅ Search by title/content
- ✅ Filter by tags
- ✅ Mark as favorite
- ✅ Responsive cards layout

### Bookmarks Management
- ✅ Save URLs with metadata
- ✅ Auto-fetch page titles
- ✅ Add descriptions
- ✅ Tag organization
- ✅ Search across title/URL/description
- ✅ Filter by tags
- ✅ Mark as favorite
- ✅ Open in new tab

### UI/UX Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Clean, modern interface
- ✅ Modal dialogs for forms
- ✅ Toast notifications
- ✅ Loading states
- ✅ Smooth animations
- ✅ Intuitive navigation
- ✅ Accessibility features

## 📁 Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.jsx              # Root layout
│   │   ├── page.jsx                # Home page
│   │   ├── globals.css             # Global styles
│   │   ├── notes/
│   │   │   └── page.jsx            # Notes page
│   │   └── bookmarks/
│   │       └── page.jsx            # Bookmarks page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx          # Navigation header
│   │   ├── notes/
│   │   │   ├── NoteCard.jsx        # Note display card
│   │   │   ├── NoteForm.jsx        # Create/Edit form
│   │   │   └── NoteList.jsx        # Notes grid
│   │   ├── bookmarks/
│   │   │   ├── BookmarkCard.jsx    # Bookmark display card
│   │   │   ├── BookmarkForm.jsx    # Create/Edit form
│   │   │   └── BookmarkList.jsx    # Bookmarks grid
│   │   └── common/
│   │       ├── SearchBar.jsx       # Search input
│   │       ├── TagFilter.jsx       # Tag filtering
│   │       └── Modal.jsx           # Modal dialog
│   │
│   ├── lib/
│   │   └── api.js                  # API client
│   │
│   └── utils/
│       └── constants.js            # Helper functions
│
├── public/
├── .env.local
├── jsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **React**: 18.2
- **Styling**: Tailwind CSS 3.3
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **State Management**: React Hooks

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Scheme

Primary colors defined in Tailwind config:
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)

## 💡 Key Features

### JSX Format
- All React components use `.jsx` extension
- Better IDE support and syntax highlighting
- Clear separation between React and utility files

### Path Aliases
- `@/components/*` - Component imports
- `@/lib/*` - API and utilities
- `@/utils/*` - Helper functions

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus management in modals

## 🐛 Troubleshooting

**Can't connect to API:**
- Check backend is running on port 5000
- Verify `.env.local` has correct API URL
- Check browser console for CORS errors

**Styles not loading:**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

**Changes not reflecting:**
- Hard refresh browser (Ctrl/Cmd + Shift + R)
- Clear browser cache

## 📝 Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

⚠️ **Important**: Variables must start with `NEXT_PUBLIC_` to be accessible in the browser.

## 🚀 Deployment

For production deployment:

1. Build the app: `npm run build`
2. Set production API URL in environment
3. Deploy to Vercel, Netlify, or any Node.js hosting
4. Ensure backend API is accessible from deployment

---

**Built with ❤️ using Next.js 14, React 18, and Tailwind CSS**