import axios from "axios";

const API_URL = "http://localhost:5000/api";

export interface BudgetItem {
    id: number;
    description: string;
    BudgetCategoryId: number;
    amount: number;
    status: "Pending" | "Approved" | "Rejected";
    date: string;
}

export interface BudgetCategory {
    id: number;
    name: string;
    icon: string;
    iconColor: string;
    BudgetId: number;
    BudgetItems: BudgetItem[];
}

export interface Budget {
    id: number;
    EventId: number;
    BudgetCategories: BudgetCategory[];
}

// Import Event type from events service
import { Event } from "./events.service";

class BudgetService {
    // Event Budget Operations
    async createEventBudget(eventId: number): Promise<Budget> {
        const response = await axios.post(`${API_URL}/budget`, { EventId: eventId });
        return response.data;
    }

    async getBudgetById(id: number): Promise<Budget> {
        const response = await axios.get(`${API_URL}/budget/${id}`);
        return response.data;
    }

    // Budget Category Operations
    async createCategory(category: Omit<BudgetCategory, "id" | "items">): Promise<BudgetCategory> {
        const response = await axios.post(`${API_URL}/budget/categories`, category);
        return response.data;
    }

    async updateCategory(id: number, category: Partial<BudgetCategory>): Promise<void> {
        await axios.put(`${API_URL}/budget/categories/${id}`, category);
    }

    async deleteCategory(id: number): Promise<void> {
        await axios.delete(`${API_URL}/budget/categories/${id}`);
    }

    // Budget Item Operations
    async createItem(item: Omit<BudgetItem, "id">): Promise<BudgetItem> {
        const response = await axios.post(`${API_URL}/budget/items`, item);
        return response.data;
    }

    async updateItem(id: number, item: Partial<BudgetItem>): Promise<void> {
        await axios.put(`${API_URL}/budget/items/${id}`, item);
    }

    async deleteItem(id: number): Promise<void> {
        await axios.delete(`${API_URL}/budget/items/${id}`);
    }
}

export default new BudgetService(); 