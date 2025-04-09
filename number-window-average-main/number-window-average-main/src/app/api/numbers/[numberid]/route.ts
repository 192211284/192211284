
import { fetchNumbers } from '@/lib/api';
import windowStore from '@/lib/windowStore';
import { NumberResponse } from '@/types/api';

// Global window size - in a real app, this would be configurable
const WINDOW_SIZE = 10;

export async function GET(
  request: Request,
  { params }: { params: { numberid: string } }
) {
  const numberType = params.numberid;

  if (!numberType || !['p', 'f', 'e', 'r'].includes(numberType)) {
    return new Response(
      JSON.stringify({ error: 'Invalid number type' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Store previous state
    const windowPrevState = [...windowStore[numberType].numbers];
    
    // Fetch new numbers from API
    const numbers = await fetchNumbers(numberType);
    
    if (numbers.length === 0) {
      // If the API returned no numbers, return the current state
      const avg = windowStore[numberType].numbers.length > 0 
        ? windowStore[numberType].numbers.reduce((sum, num) => sum + num, 0) / windowStore[numberType].numbers.length
        : 0;
        
      const response: NumberResponse = {
        windowPrevState,
        windowCurrState: [...windowStore[numberType].numbers],
        numbers: [],
        avg,
      };
      
      return new Response(
        JSON.stringify(response),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Process new numbers: remove duplicates and add to window
    for (const num of numbers) {
      // Skip if the number is already in the window
      if (!windowStore[numberType].numbers.includes(num)) {
        if (windowStore[numberType].numbers.length >= WINDOW_SIZE) {
          // Window is full, remove oldest number
          windowStore[numberType].numbers.shift();
        }
        // Add new number to the window
        windowStore[numberType].numbers.push(num);
      }
    }
    
    // Update timestamp
    windowStore[numberType].timestamp = Date.now();
    
    // Calculate average
    const avg = windowStore[numberType].numbers.length > 0 
      ? windowStore[numberType].numbers.reduce((sum, num) => sum + num, 0) / windowStore[numberType].numbers.length
      : 0;
      
    // Prepare response
    const response: NumberResponse = {
      windowPrevState,
      windowCurrState: [...windowStore[numberType].numbers],
      numbers,
      avg,
    };
    
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in number API handler:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
