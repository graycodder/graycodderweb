import {
    collection,
    getDocs,
    doc,
    setDoc,
    Timestamp,
    query,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import firebaseData from '../../firebase_data.json';

// Types
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    imageUrl: string;
    category: string;
    createdAt: string; // ISO string
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    link?: string;
    date: string;
    createdAt: string; // ISO string
}

export interface CourseRegistration {
    id: string;
    name: string;
    email: string;
    phone: string;
    stream: string;
    graduationStatus: string;
    message: string;
    courseName: string;
    status?: 'Pending' | 'Shortlisted' | 'Selected' | 'Contacted' | 'Rejected';
    createdAt: string; // ISO string
}

// Collection References
const BLOG_COLLECTION = 'blog';
const PORTFOLIO_COLLECTION = 'portfolio';
const REGISTRATIONS_COLLECTION = 'registrations';

// Fetch Functions
export const getBlogs = async (): Promise<BlogPost[]> => {
    try {
        const q = query(collection(db, BLOG_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as BlogPost));
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
    // Fallback to local json data if firestore is empty or errored
    return Object.entries(firebaseData.blog || {}).map(([id, item]) => ({
        id,
        ...(item as any)
    }));
};

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
    try {
        const q = query(collection(db, PORTFOLIO_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as BlogPost as any));
        }
    } catch (error) {
        console.error("Error fetching portfolio items:", error);
    }
    // Fallback to local json data if firestore is empty or errored
    return Object.entries(firebaseData.portfolio || {}).map(([id, item]) => ({
        id,
        ...(item as any)
    }));
};


// CRUD Operations for Blog
export const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, BLOG_COLLECTION), post);
        return docRef.id;
    } catch (error) {
        console.error("Error adding blog post:", error);
        throw error;
    }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
        const docRef = doc(db, BLOG_COLLECTION, id);
        await updateDoc(docRef, post);
    } catch (error) {
        console.error("Error updating blog post:", error);
        throw error;
    }
};

export const deleteBlogPost = async (id: string) => {
    try {
        const docRef = doc(db, BLOG_COLLECTION, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting blog post:", error);
        throw error;
    }
};

// CRUD Operations for Portfolio
export const addPortfolioItem = async (item: Omit<PortfolioItem, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, PORTFOLIO_COLLECTION), item);
        return docRef.id;
    } catch (error) {
        console.error("Error adding portfolio item:", error);
        throw error;
    }
};

export const updatePortfolioItem = async (id: string, item: Partial<PortfolioItem>) => {
    try {
        const docRef = doc(db, PORTFOLIO_COLLECTION, id);
        await updateDoc(docRef, item);
    } catch (error) {
        console.error("Error updating portfolio item:", error);
        throw error;
    }
};

export const deletePortfolioItem = async (id: string) => {
    try {
        const docRef = doc(db, PORTFOLIO_COLLECTION, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting portfolio item:", error);
        throw error;
    }
};

// CRUD Operations for Course Registrations
export const addRegistration = async (registration: Omit<CourseRegistration, 'id'>) => {
    try {
        const docRef = await addDoc(collection(db, REGISTRATIONS_COLLECTION), registration);
        return docRef.id;
    } catch (error) {
        console.error("Error adding course registration:", error);
        throw error;
    }
};

export const getRegistrations = async (): Promise<CourseRegistration[]> => {
    try {
        const q = query(collection(db, REGISTRATIONS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as CourseRegistration));
        }
    } catch (error) {
        console.error("Error fetching registrations:", error);
    }
    return [];
};

export const deleteRegistration = async (id: string) => {
    try {
        const docRef = doc(db, REGISTRATIONS_COLLECTION, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting registration:", error);
        throw error;
    }
};

export const updateRegistrationStatus = async (id: string, status: 'Pending' | 'Shortlisted' | 'Selected' | 'Contacted' | 'Rejected') => {
    try {
        const docRef = doc(db, REGISTRATIONS_COLLECTION, id);
        await updateDoc(docRef, { status });
    } catch (error) {
        console.error("Error updating registration status:", error);
        throw error;
    }
};

// Seeding Function
export const seedDatabase = async () => {
    try {
        console.log("Starting database seed...");

        // Seed Blog
        const blogPosts = firebaseData.blog;
        for (const [key, post] of Object.entries(blogPosts)) {
            await setDoc(doc(db, BLOG_COLLECTION, key), post);
            console.log(`Seeded blog post: ${key}`);
        }

        // Seed Portfolio
        const portfolioItems = firebaseData.portfolio;
        for (const [key, item] of Object.entries(portfolioItems)) {
            await setDoc(doc(db, PORTFOLIO_COLLECTION, key), item);
            console.log(`Seeded portfolio item: ${key}`);
        }

        console.log("Database seeding completed successfully!");
        return true;
    } catch (error) {
        console.error("Error seeding database:", error);
        return false;
    }
};
