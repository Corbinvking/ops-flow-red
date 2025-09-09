# 🚀 Frontend Database Connection - Deployment Guide

## ✅ **Issues Fixed**

1. **API Endpoints**: Fixed `/api/auth/login` → `/auth/login` to match backend
2. **Environment Configuration**: Added proper production URLs
3. **User Management**: Created complete admin panel for user management
4. **Authentication**: Updated AuthContext to handle backend responses correctly

## 🔧 **Required Environment Variables**

### **For Development (.env.local)**
```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_AIRTABLE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Ops Flow Red
VITE_APP_VERSION=1.0.0
```

### **For Production (Vercel Environment Variables)**
```bash
VITE_API_BASE_URL=https://artistinfluence.dpdns.org
VITE_AIRTABLE_API_BASE_URL=https://artistinfluence.dpdns.org/airtable
VITE_APP_NAME=Ops Flow Red
VITE_APP_VERSION=1.0.0
```

## 📋 **Deployment Steps**

### **Step 1: Set Environment Variables**

#### **For Local Development:**
1. Create `.env.local` file in `ops-flow-red/` directory:
```bash
cd ops-flow-red
echo "VITE_API_BASE_URL=http://localhost:3000" > .env.local
echo "VITE_AIRTABLE_API_BASE_URL=http://localhost:3001" >> .env.local
echo "VITE_APP_NAME=Ops Flow Red" >> .env.local
echo "VITE_APP_VERSION=1.0.0" >> .env.local
```

#### **For Production (Vercel):**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:
   - `VITE_API_BASE_URL` = `https://artistinfluence.dpdns.org`
   - `VITE_AIRTABLE_API_BASE_URL` = `https://artistinfluence.dpdns.org/airtable`
   - `VITE_APP_NAME` = `Ops Flow Red`
   - `VITE_APP_VERSION` = `1.0.0`

### **Step 2: Test Local Connection**

1. **Start your backend** (should already be running on your droplet):
```bash
# Backend should be running on:
# - RBAC API: http://localhost:3000
# - Airtable API: http://localhost:3001
```

2. **Start frontend development server**:
```bash
cd ops-flow-red
npm run dev
```

3. **Test the connection**:
   - Open http://localhost:5173
   - Try logging in with: `admin@example.com` / `admin123`
   - Check browser console for any API errors

### **Step 3: Deploy to Production**

#### **Option A: Deploy to Vercel**
```bash
cd ops-flow-red
npm install -g vercel
vercel login
vercel --prod
```

#### **Option B: Deploy to Netlify**
```bash
cd ops-flow-red
npm run build
# Upload dist/ folder to Netlify
```

## 🔐 **Testing the RBAC System**

### **1. Test Authentication**
```bash
# Test login endpoint
curl -X POST https://artistinfluence.dpdns.org/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### **2. Test User Management**
```bash
# Get admin token from login response, then:
curl -X GET https://artistinfluence.dpdns.org/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **3. Test Frontend Integration**
1. Open your deployed frontend
2. Login with admin credentials
3. Navigate to User Management panel
4. Try creating, editing, and deleting users

## 🎯 **Available User Roles**

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, can create/delete users |
| **Operator** | User management + profiles |
| **Sales** | Reports + limited user access |
| **Engineer** | Reports creation + read access |
| **Viewer** | Read-only access |

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors**:
   - Check that backend CORS is configured for your frontend domain
   - Verify environment variables are set correctly

2. **Authentication Failures**:
   - Check that API endpoints match between frontend and backend
   - Verify token is being stored and sent correctly

3. **User Management Not Working**:
   - Ensure you're logged in as admin or operator
   - Check browser console for API errors
   - Verify backend user management endpoints are working

### **Debug Commands:**

```bash
# Check backend health
curl https://artistinfluence.dpdns.org/health

# Check Airtable API health
curl https://artistinfluence.dpdns.org/airtable/health

# Test user creation
curl -X POST https://artistinfluence.dpdns.org/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"viewer","first_name":"Test","last_name":"User"}'
```

## ✅ **Verification Checklist**

- [ ] Environment variables set correctly
- [ ] Frontend can connect to backend APIs
- [ ] Authentication working (login/logout)
- [ ] User management panel accessible
- [ ] Admin can create/edit/delete users
- [ ] Role-based permissions working
- [ ] Airtable data integration working
- [ ] Production deployment successful

## 🚀 **Next Steps**

1. **Deploy frontend** with correct environment variables
2. **Test all RBAC functionality** in production
3. **Set up monitoring** for API endpoints
4. **Configure SSL certificates** if needed
5. **Set up automated backups** for user data

Your frontend is now properly configured to interact with your RBAC database! 🎉
