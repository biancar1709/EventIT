import axios, { AxiosError } from "axios";
import budgetService, { Budget } from "./budget.service";

const API_URL = "http://localhost:5000/api";

export interface Event {
    id: number;
    title: string;
    date: string;
    type: string;
    location: string;
    description: string;
    BudgetId: number;
    budget?: Budget;
}

class EventsService {
    async getAllEvents(): Promise<Event[]> {
        try {
            const response = await axios.get(`${API_URL}/events`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    throw new Error("Events not found");
                }
                if (error.response?.status === 500) {
                    throw new Error("Server error occurred while fetching events");
                }
            }
            throw new Error("Failed to fetch events");
        }
    }

    async getEventById(id: number): Promise<Event> {
        try {
            const response = await axios.get(`${API_URL}/events/${id}`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    throw new Error(`Event with ID ${id} not found`);
                }
                if (error.response?.status === 500) {
                    throw new Error("Server error occurred while fetching event");
                }
            }
            throw new Error("Failed to fetch event");
        }
    }

    async createEvent(event: Event): Promise<Event> {
        try {
            const budget = await budgetService.createEventBudget();
            const response = await axios.post(`${API_URL}/events`, {...event, BudgetId: budget.id});
            return { ...response.data, budget };
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    throw new Error("Invalid event data provided");
                }
                if (error.response?.status === 409) {
                    throw new Error("Event with this name already exists");
                }
                if (error.response?.status === 500) {
                    throw new Error("Server error occurred while creating event");
                }
            }
            throw new Error("Failed to create event");
        }
    }

    async updateEvent(id: number, event: Partial<Event>): Promise<void> {
        try {
            await axios.put(`${API_URL}/events/${id}`, event);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    throw new Error("Invalid event data provided");
                }
                if (error.response?.status === 404) {
                    throw new Error(`Event with ID ${id} not found`);
                }
                if (error.response?.status === 409) {
                    throw new Error("Event with this name already exists");
                }
                if (error.response?.status === 500) {
                    throw new Error("Server error occurred while updating event");
                }
            }
            throw new Error("Failed to update event");
        }
    }

    async deleteEvent(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/events/${id}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    throw new Error(`Event with ID ${id} not found`);
                }
                if (error.response?.status === 500) {
                    throw new Error("Server error occurred while deleting event");
                }
            }
            throw new Error("Failed to delete event");
        }
    }
}

export default new EventsService(); 