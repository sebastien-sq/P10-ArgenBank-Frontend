import { expect, describe, it, beforeEach, vi } from "vitest";
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from "../app/slices/authSlice";
import { userSlice } from "../app/slices/userSlice";
import { authApi } from "../app/services/authApi";
import { userApi } from "../app/services/userApi";
import { useFetchUserFirstName, useFetchUserLastName, useFetchUserEmail, useFetchUserId } from "../app/hooks/useUserProfile";
import { useAuthenticated } from "../app/hooks/useAuthenticated";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = vi.fn();

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      user: userSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
    preloadedState: initialState,
  });
};

const wrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

describe('User Profile Hooks', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('useFetchUserFirstName', () => {
    it('should return null when no user data', () => {
      const { result } = renderHook(() => useFetchUserFirstName(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBeNull();
    });

    it('should return firstName when user data exists', () => {
      const userState = {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'IDLE',
          error: null,
        }
      };

      store = createTestStore(userState);
      
      const { result } = renderHook(() => useFetchUserFirstName(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe('John');
    });
  });

  describe('useFetchUserLastName', () => {
    it('should return null when no user data', () => {
      const { result } = renderHook(() => useFetchUserLastName(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBeNull();
    });

    it('should return lastName when user data exists', () => {
      const userState = {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'IDLE',
          error: null,
        }
      };

      store = createTestStore(userState);
      
      const { result } = renderHook(() => useFetchUserLastName(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe('Doe');
    });
  });

  describe('useFetchUserEmail', () => {
    it('should return null when no user data', () => {
      const { result } = renderHook(() => useFetchUserEmail(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBeNull();
    });

    it('should return email when user data exists', () => {
      const userState = {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'IDLE',
          error: null,
        }
      };

      store = createTestStore(userState);
      
      const { result } = renderHook(() => useFetchUserEmail(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe('john@example.com');
    });
  });

  describe('useFetchUserId', () => {
    it('should return null when no user data', () => {
      const { result } = renderHook(() => useFetchUserId(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBeNull();
    });

    it('should return id when user data exists', () => {
      const userState = {
        user: {
          id: 42,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          status: 'IDLE',
          error: null,
        }
      };

      store = createTestStore(userState);
      
      const { result } = renderHook(() => useFetchUserId(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe(42);
    });
  });
});

describe('Authentication Hooks', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('useAuthenticated', () => {
    it('should return false when not authenticated', () => {
      const { result } = renderHook(() => useAuthenticated(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe(false);
    });

    it('should return true when authenticated', () => {
      const authState = {
        auth: {
          status: 'SUCCEEDED',
          error: null,
          token: 'test-token',
          isAuthenticated: true,
        }
      };

      store = createTestStore(authState);
      
      const { result } = renderHook(() => useAuthenticated(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe(true);
    });

    it('should return false when token exists but isAuthenticated is false', () => {
      const authState = {
        auth: {
          status: 'FAILED',
          error: 'Login failed',
          token: 'invalid-token',
          isAuthenticated: false,
        }
      };

      store = createTestStore(authState);
      
      const { result } = renderHook(() => useAuthenticated(), {
        wrapper: ({ children }) => wrapper({ children, store })
      });

      expect(result.current).toBe(false);
    });
  });
});
