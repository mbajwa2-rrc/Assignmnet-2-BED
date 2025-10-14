// test/jest.setup.ts
// Mock Firebase so Jest tests don't connect to real Firestore

jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue({ id: "mock-id" }),
      doc: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: jest.fn(() => ({ name: "Mock Data" })),
        }),
        update: jest.fn().mockResolvedValue(true),
        delete: jest.fn().mockResolvedValue(true),
      })),
      get: jest.fn().mockResolvedValue({
        docs: [
          { id: "1", data: jest.fn(() => ({ name: "Mock 1" })) },
          { id: "2", data: jest.fn(() => ({ name: "Mock 2" })) },
        ],
      }),
    })),
  },
}));

// Reset mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});

// Reset modules after all tests
afterAll(() => {
  jest.resetModules();
});
