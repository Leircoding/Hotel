# Suite - Hotel Guest Concierge Application

A mobile-first hotel guest concierge web application built with React, Vite, and modern web technologies.

## Features

### Home Screen
- View stay details (room, hotel, check-out date, nights remaining)
- Quick access to maintenance requests, staff contact, and dining options
- Clean, intuitive interface

### Chat Screen
- Send messages to concierge
- Receive automated responses
- Category navigation (Dining, Local, Room)
- Chat history stored in localStorage
- Clear chat option

### Maintenance Request Form
- Select issue category (AC, Plumbing, Electrical, TV, Wi-Fi, etc.)
- Describe the problem
- Set urgency level (Normal, Important, Emergency)
- Upload photo (preview functionality)
- Automatic request number generation
- Form validation with error messages
- Confirmation screen with request number
- Request history stored in localStorage

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS 3** - Styling with CSS variables
- **localStorage** - Client-side data persistence

## Project Structure

```
Hotel/
├── src/
│   ├── components/           # Reusable components
│   │   ├── AppHeader.jsx
│   │   ├── BottomNavigation.jsx
│   │   ├── StayCard.jsx
│   │   ├── HelpCard.jsx
│   │   ├── ChatInput.jsx
│   │   ├── CategoryNavigation.jsx
│   │   ├── MaintenanceForm.jsx
│   │   ├── ConfirmationMessage.jsx
│   │   └── (CSS files)
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Chat.jsx
│   │   ├── Maintenance.jsx
│   │   └── (CSS files)
│   ├── App.jsx              # Root component
│   ├── App.css              # App styling
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Leircoding/Hotel.git
cd Hotel
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` and hot-reload on changes.

### Production Build

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

Preview the production build locally:
```bash
npm run preview
```

## Design System

### Color Palette
- **Background**: `#f5f1ed` - Warm off-white
- **Primary**: `#2a2a2a` - Dark charcoal
- **Accent**: `#d96e45` - Red-orange
- **White**: `#ffffff` - Cards and surfaces
- **Text Light**: `#9a9a9a` - Secondary text
- **Border**: `#e0dcd7` - Subtle borders

### Typography
- System font stack for optimal legibility
- Responsive font sizes
- Clear hierarchy with weight and size

### Spacing
- Consistent 8px-based spacing scale
- Generous padding and margins
- Clear visual hierarchy

### Components
- Rounded corners (8px-24px)
- Subtle shadows
- Smooth transitions
- Accessible contrast ratios

## Features

### localStorage
- Chat message history
- Maintenance request history
- Guest name

### Responsive Design
- Mobile-first approach
- Optimized for 390px width
- Desktop-friendly layout
- Phone-style container on desktop

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Sufficient color contrast
- Focus indicators

## Deployment

The application is configured to deploy to GitHub Pages at `https://leircoding.github.io/Hotel/`.

A GitHub Actions workflow automatically builds and deploys the application on push to the main branch.

To deploy manually:
```bash
npm run build
# Push the dist/ directory to gh-pages branch
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- Real backend integration
- Photo upload to server
- Real-time notifications
- User authentication
- Request status tracking
- Staff dashboard
- Analytics

## License

MIT

## Author

Gabriel Martinez
