# Firebase Setup Guide for Graycodder Website

This guide will help you connect your Graycodder website to Firebase for production use.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "Graycodder"
4. Follow the setup wizard

## Step 2: Get Firebase Configuration

1. In Firebase Console, click on the gear icon (Project Settings)
2. Scroll down to "Your apps" section
3. Click on the Web icon (</>)
4. Register your app with a nickname (e.g., "Graycodder Web")
5. Copy the Firebase configuration object

## Step 3: Update Firebase Configuration

Open `/src/lib/firebase.ts` and replace the placeholder values with your actual Firebase configuration:

```typescript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPmuI79a9RECMvkM_KboCSl90fGst5Qvo",
  authDomain: "aycodderweb.firebaseapp.com",
  projectId: "aycodderweb",
  storageBucket: "aycodderweb.firebasestorage.app",
  messagingSenderId: "694837469429",
  appId: "1:694837469429:web:6b2dc47dd94bd7e30765bc",
  measurementId: "G-RV8W6XT0VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

```

## Step 4: Enable Firebase Services

### Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" authentication
4. Create an admin user account

### Firestore Database
1. Go to "Firestore Database"
2. Click "Create Database"
3. Start in production mode (or test mode for development)
4. Choose a location (preferably close to India, e.g., asia-south1)

### Storage (for images)
1. Go to "Storage"
2. Click "Get Started"
3. Set up security rules

## Step 5: Set up Firestore Collections

Create two collections in Firestore:

### Collection: `blog`
Structure for each document:
```json
{
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "author": "string",
  "date": "string",
  "imageUrl": "string",
  "category": "string",
  "createdAt": "timestamp"
}
```

### Collection: `portfolio`
Structure for each document:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "imageUrl": "string",
  "link": "string",
  "date": "string",
  "createdAt": "timestamp"
}
```

## Step 6: Update Security Rules

### Firestore Rules
Go to Firestore Database > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all
    match /blog/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /portfolio/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
Go to Storage > Rules and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Implement Firebase Functions in Your Code

Update `/src/app/App.tsx` to fetch data from Firebase:

```typescript
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Fetch blog posts
const fetchBlogPosts = async () => {
  const snapshot = await getDocs(collection(db, 'blog'));
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setBlogPosts(posts);
};

// Fetch portfolio items
const fetchPortfolioItems = async () => {
  const snapshot = await getDocs(collection(db, 'portfolio'));
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setPortfolioItems(items);
};

// Add to useEffect
useEffect(() => {
  fetchBlogPosts();
  fetchPortfolioItems();
}, []);
```

## Step 8: Implement Authentication

Update `/src/app/components/AdminLogin.tsx`:

```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Login successful!');
    onLogin(email, password);
  } catch (error) {
    toast.error('Invalid credentials');
  }
};
```

## Step 9: Implement CRUD Operations

In `/src/app/components/AdminPanel.tsx`, update the handlers:

```typescript
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

// Add blog post
const handleAddBlog = async () => {
  const docRef = await addDoc(collection(db, 'blog'), {
    ...blogForm,
    date: new Date().toLocaleDateString(),
    createdAt: new Date()
  });
  toast.success('Blog post added!');
};

// Update blog post
const handleUpdateBlog = async () => {
  await updateDoc(doc(db, 'blog', editingBlog.id), blogForm);
  toast.success('Blog post updated!');
};

// Delete blog post
const handleDeleteBlog = async (id: string) => {
  await deleteDoc(doc(db, 'blog', id));
  toast.success('Blog post deleted!');
};
```

## Step 10: Deploy

1. Build your application: `npm run build`
2. Deploy to Firebase Hosting:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## Additional Tips

- **Environment Variables**: Store Firebase config in environment variables for production
- **Image Upload**: Implement Firebase Storage upload for images in the admin panel
- **Backup**: Regularly backup your Firestore data
- **Analytics**: Enable Firebase Analytics to track website usage
- **Performance**: Enable Firebase Performance Monitoring

## Support

For any questions or issues, contact the Graycodder team at info@graycodder.com

---

**Current Status**: The website is currently using mock data. Follow the steps above to connect to your Firebase backend.
