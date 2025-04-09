
import { NumberResponse } from '@/types/api';
import { toast } from 'sonner';

// Fetch wrapper with error handling
export const fetchData = async (url: string, options?: RequestInit): Promise<any> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    toast.error('Failed to fetch data. Please try again.');
    throw error;
  }
};

// API client for the numbers service
export const NumbersAPI = {
  getNumbers: async (numberType: string): Promise<NumberResponse> => {
    // For local development, use mock data directly without the API call
    if (import.meta.env.DEV) {
      const { mockResponses } = await import('@/mocks/api');
      const mockData = mockResponses[numberType as keyof typeof mockResponses];
      const windowSize = 10;
      
      // Generate a mock response
      return {
        windowPrevState: [],
        windowCurrState: mockData.numbers.slice(0, windowSize),
        numbers: mockData.numbers,
        avg: mockData.numbers.reduce((sum, num) => sum + num, 0) / mockData.numbers.length,
      };
    }
    
    // In production, use the actual API endpoint
    return fetchData(`/api/numbers/${numberType}`);
  },
};
