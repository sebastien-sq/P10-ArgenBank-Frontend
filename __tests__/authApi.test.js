import { expect, describe, it, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../app/slices/authSlice";
import { userSlice } from "../app/slices/userSlice";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock des APIs pour éviter les problèmes de fetch
const mockAuthApi = {
  reducerPath: "authApi",
  reducer: (state = {}, action) => state,
  middleware: () => (next) => (action) => next(action),
  endpoints: {
    loginUser: {
      initiate: vi.fn(),
    },
    signUpUser: {
      initiate: vi.fn(),
    },
  },
};

const mockUserApi = {
  reducerPath: "userApi", 
  reducer: (state = {}, action) => state,
  middleware: () => (next) => (action) => next(action),
  endpoints: {
    getUserProfile: {
      initiate: vi.fn(),
    },
  },
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      user: userSlice.reducer,
      [mockAuthApi.reducerPath]: mockAuthApi.reducer,
      [mockUserApi.reducerPath]: mockUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mockAuthApi.middleware, mockUserApi.middleware),
  });
};

describe('AuthApi', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('AuthSlice Actions', () => {
    it('should handle setCredentials action', () => {
      store.dispatch(authSlice.actions.setCredentials({ token: 'test-token-123' }));
      
      const state = store.getState();
      expect(state.auth.token).toBe('test-token-123');
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.status).toBe('SUCCEEDED');
    });

    it('should handle logout action', () => {
      // Set initial authenticated state
      store.dispatch(authSlice.actions.setCredentials({ token: 'test-token-123' }));
      
      // Mock localStorage token
      localStorageMock.getItem.mockReturnValue('test-token-123');
      
      // Dispatch logout
      store.dispatch(authSlice.actions.logout());
      
      const state = store.getState();
      expect(state.auth.token).toBeNull();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.auth.status).toBe('IDLE');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle loginFailed action', () => {
      store.dispatch(authSlice.actions.loginFailed('Login failed'));
      
      const state = store.getState();
      expect(state.auth.error).toBe('Login failed');
      expect(state.auth.status).toBe('FAILED');
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.auth.token).toBeNull();
    });
  });

  describe('UserSlice Actions', () => {
    it('should handle setUser action', () => {
      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      store.dispatch(userSlice.actions.setUser(userData));
      
      const state = store.getState();
      expect(state.user).toEqual({
        ...userData,
        status: 'IDLE',
        error: null,
      });
    });

    it('should handle clearUser action', () => {
      // Set initial user data
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }));

      // Clear user data
      store.dispatch(userSlice.actions.clearUser());
      
      const state = store.getState();
      expect(state.user.id).toBeNull();
      expect(state.user.firstName).toBeNull();
      expect(state.user.lastName).toBeNull();
      expect(state.user.email).toBeNull();
      expect(state.user.status).toBe('IDLE');
      expect(state.user.error).toBeNull();
    });
  });

  describe('Authentication Flow', () => {
    it('should handle complete login flow', () => {
      // Simulate successful login
      store.dispatch(authSlice.actions.setCredentials({ token: 'test-token-123' }));
      
      // Simulate user profile loading
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }));

      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.token).toBe('test-token-123');
      expect(state.user.firstName).toBe('John');
      expect(state.user.lastName).toBe('Doe');
    });

    it('should handle login failure flow', () => {
      // Simulate login failure
      store.dispatch(authSlice.actions.loginFailed('Invalid credentials'));
      
      // Simulate clearing user data
      store.dispatch(userSlice.actions.clearUser());

      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.auth.error).toBe('Invalid credentials');
      expect(state.auth.status).toBe('FAILED');
      expect(state.user.id).toBeNull();
      expect(state.user.firstName).toBeNull();
    });

    it('should handle logout flow', () => {
      // Set authenticated state with user data
      store.dispatch(authSlice.actions.setCredentials({ token: 'test-token-123' }));
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }));

      // Mock localStorage
      localStorageMock.getItem.mockReturnValue('test-token-123');

      // Logout
      store.dispatch(authSlice.actions.logout());
      store.dispatch(userSlice.actions.clearUser());

      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(false);
      expect(state.auth.token).toBeNull();
      expect(state.user.id).toBeNull();
      expect(state.user.firstName).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('API Mock Configuration', () => {
    it('should have correct reducer paths', () => {
      expect(mockAuthApi.reducerPath).toBe('authApi');
      expect(mockUserApi.reducerPath).toBe('userApi');
    });

    it('should have correct endpoints', () => {
      expect(mockAuthApi.endpoints.loginUser).toBeDefined();
      expect(mockAuthApi.endpoints.signUpUser).toBeDefined();
      expect(mockUserApi.endpoints.getUserProfile).toBeDefined();
    });
  });
});
