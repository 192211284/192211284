
export interface NumberResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

export interface NumberRequest {
  numberType: 'p' | 'f' | 'e' | 'r';
}

export interface ServerNumberResponse {
  numbers: number[];
}

export interface WindowStore {
  [key: string]: {
    numbers: number[];
    timestamp: number;
  };
}
