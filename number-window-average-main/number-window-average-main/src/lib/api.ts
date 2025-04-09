
import { ServerNumberResponse } from '@/types/api';
import { getMockNumbers } from '@/mocks/api';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';
const TIMEOUT_MS = 500;

// Function to fetch with timeout
export async function fetchWithTimeout<T>(
  url: string, 
  options: RequestInit = {}, 
  timeout: number = TIMEOUT_MS
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  
  clearTimeout(id);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

// Use mock data for local development or when the actual API is not accessible
const USE_MOCK_DATA = true; // Set to false to use actual API

// APIs for fetching different number types
export const fetchNumbers = async (type: string): Promise<number[]> => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300));
    return getMockNumbers(type);
  }
  
  try {
    let endpoint: string;

    switch (type) {
      case 'p':
        endpoint = `${API_BASE_URL}/primes`;
        break;
      case 'f':
        endpoint = `${API_BASE_URL}/fibo`;
        break;
      case 'e':
        endpoint = `${API_BASE_URL}/even`;
        break;
      case 'r':
        endpoint = `${API_BASE_URL}/random`;
        break;
      default:
        throw new Error(`Invalid number type: ${type}`);
    }

    const response = await fetchWithTimeout<ServerNumberResponse>(endpoint);
    return response.numbers;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Request timed out');
      return [];
    }
    
    console.error('Error fetching numbers:', error);
    return [];
  }
};
