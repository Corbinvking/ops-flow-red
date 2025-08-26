# 🎯 Ops Flow Red - Operations Dashboard

A modern React-based operations dashboard for managing campaigns, invoices, and business operations with real-time Airtable integration.

## 🚀 Features

- **Real-time Dashboard**: Live KPI monitoring and campaign tracking
- **Multi-platform Operations**: SoundCloud, YouTube, Instagram, Spotify management
- **Airtable Integration**: Direct read/write access to 14+ business tables
- **Role-based Access Control**: Secure authentication with user roles
- **Responsive Design**: Mobile-friendly interface with dark theme
- **Real-time Updates**: Live data synchronization with Airtable

## 🏗️ Architecture

```
Frontend (React + Vite) ←→ Backend APIs ←→ Airtable + PostgreSQL
     ↓                           ↓
  Vercel (CDN)              DigitalOcean (Docker)
```

### **Backend Services**
- **RBAC API** (Port 3000): Authentication & user management
- **Airtable API** (Port 3001): Business data operations
- **PostgreSQL**: Data mirroring and caching
- **Redis**: Session management and caching

## 🛠️ Development Setup

### **Prerequisites**
- Node.js 18+ and npm
- Git
- Backend servers running (see backend setup)

### **Quick Start**

1. **Clone and Setup**
   ```bash
   git clone <your-repo-url>
   cd ops-flow-red
   npm run setup
   ```

2. **Configure Environment**
   ```bash
   # Copy environment template
   cp env.example .env.local
   
   # Edit .env.local with your API endpoints
   VITE_API_BASE_URL=http://localhost:3000
   VITE_AIRTABLE_API_BASE_URL=http://localhost:3001
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend APIs: http://localhost:3000, http://localhost:3001

### **Backend Connection**

Ensure your backend services are running:

```bash
# Terminal 1: RBAC API
cd ../backend
npm start  # Runs on port 3000

# Terminal 2: Airtable API  
cd ../backend
node airtable-api-server.js  # Runs on port 3001
```

## 🔗 API Integration

### **Authentication Flow**
```typescript
import { api } from '@/lib/api';

// Login
const response = await api.auth.login(email, password);
api.setAuthToken(response.token);

// Check current user
const user = await api.auth.getCurrentUser();
```

### **Airtable Data Operations**
```typescript
import { useCampaignData, useInvoiceData } from '@/hooks/useAirtableData';

// In your component
const { data: campaigns, loading, updateRecord } = useCampaignData();

// Update a record
await updateRecord(recordId, { status: 'completed' });
```

### **Available Data Hooks**
- `useCampaignData()` - Campaign tracker data
- `useYouTubeData()` - YouTube campaigns
- `useSoundCloudData()` - SoundCloud campaigns
- `useSpotifyData()` - Spotify playlisting
- `useInstagramData()` - Instagram seeding
- `useInvoiceData()` - Invoice management
- `useInvoiceRequestsData()` - Invoice requests

## 🚀 Production Deployment

### **Frontend Deployment (Vercel)**

1. **Deploy to Staging**
   ```bash
   npm run deploy
   ```

2. **Deploy to Production**
   ```bash
   npm run deploy:prod
   ```

3. **Configure Vercel Environment Variables**
   ```bash
   # In Vercel dashboard or CLI
   vercel env add VITE_API_BASE_URL
   vercel env add VITE_AIRTABLE_API_BASE_URL
   ```

### **Backend Deployment (DigitalOcean)**

1. **Deploy Backend Services**
   ```bash
   # Follow backend deployment guide
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Update Frontend Environment**
   ```bash
   # Update .env.local for production
   VITE_API_BASE_URL=https://your-digitalocean-app.com
   VITE_AIRTABLE_API_BASE_URL=https://your-digitalocean-app.com/airtable
   ```

## 🔧 Configuration

### **Environment Variables**

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:3000` | `https://your-domain.com` | RBAC API endpoint |
| `VITE_AIRTABLE_API_BASE_URL` | `http://localhost:3001` | `https://your-domain.com/airtable` | Airtable API endpoint |
| `VITE_APP_NAME` | `Ops Flow Red (Dev)` | `Ops Flow Red` | Application name |
| `VITE_APP_VERSION` | `1.0.0` | `1.0.0` | Application version |

### **API Endpoints**

#### **RBAC API (Port 3000)**
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `GET /api/users` - Get all users
- `GET /api/reports` - Get reports
- `GET /health` - Health check

#### **Airtable API (Port 3001)**
- `GET /api/airtable/tables` - List all tables
- `GET /api/airtable/records/:tableName` - Get table records
- `POST /api/airtable/records/:tableName` - Create record
- `PUT /api/airtable/records/:tableName/:id` - Update record
- `DELETE /api/airtable/records/:tableName/:id` - Delete record
- `GET /api/airtable/stats/:tableName` - Get table statistics
- `POST /api/airtable/sync/:tableName` - Sync table
- `GET /health` - Health check

## 🧪 Testing

### **Connection Testing**
1. Navigate to Settings page
2. Check "API Connection Status" section
3. Verify both RBAC and Airtable APIs are connected

### **Data Flow Testing**
1. Login with valid credentials
2. Navigate to Dashboard
3. Verify KPI data is loading from Airtable
4. Test record updates and creation

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   ```bash
   # Check backend CORS configuration
   # Ensure frontend URL is in allowed origins
   ```

2. **API Connection Failed**
   ```bash
   # Verify backend servers are running
   curl http://localhost:3000/health
   curl http://localhost:3001/health
   ```

3. **Authentication Issues**
   ```bash
   # Check localStorage for auth token
   # Verify backend authentication endpoints
   ```

4. **Airtable Data Not Loading**
   ```bash
   # Check Airtable API key and base ID
   # Verify table names match exactly
   # Check network connectivity to Airtable
   ```

### **Development Debugging**

1. **Enable Debug Logging**
   ```typescript
   // In browser console
   localStorage.setItem('debug', 'true');
   ```

2. **Check Network Requests**
   - Open browser DevTools
   - Monitor Network tab for API calls
   - Check for failed requests

3. **Verify Environment Variables**
   ```bash
   # Check if variables are loaded
   console.log(import.meta.env.VITE_API_BASE_URL);
   ```

## 📊 Data Flow

```
User Action → Frontend → API Client → Backend → Airtable → PostgreSQL Mirror
     ↑                                                              ↓
     └─────────────── Real-time Updates ←──────────────────────────┘
```

### **Real-time Features**
- Live KPI updates
- Campaign status changes
- Invoice pipeline updates
- User activity tracking

## 🔒 Security

- **Authentication**: JWT-based session management
- **Authorization**: Role-based access control
- **CORS**: Configured for production domains
- **HTTPS**: Enforced in production
- **API Keys**: Secured environment variables

## 📈 Performance

- **Caching**: Redis for session and data caching
- **CDN**: Vercel global CDN for static assets
- **Optimization**: Code splitting and lazy loading
- **Monitoring**: Built-in performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

---

**🎉 Your operations dashboard is now ready for production!**
