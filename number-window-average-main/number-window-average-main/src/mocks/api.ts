
// Mock APIs for local development and testing
export const mockResponses = {
  p: { numbers: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] },
  f: { numbers: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] },
  e: { numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  r: { numbers: [45, 22, 17, 83, 91, 36, 58, 10, 77, 42] },
};

export const getMockNumbers = (type: string) => {
  return mockResponses[type as keyof typeof mockResponses]?.numbers || [];
};
