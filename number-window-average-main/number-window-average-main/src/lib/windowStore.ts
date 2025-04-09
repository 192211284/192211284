
import { WindowStore } from '@/types/api';

// In-memory store for the numbers in each window
const windowStore: WindowStore = {
  p: { numbers: [], timestamp: Date.now() },
  f: { numbers: [], timestamp: Date.now() },
  e: { numbers: [], timestamp: Date.now() },
  r: { numbers: [], timestamp: Date.now() },
};

export default windowStore;
