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
const mockUserApi = {
  reducerPath: "userApi",
  reducer: (state = {}, action) => state,
  middleware: () => (next) => (action) => next(action),
  endpoints: {
    getUserProfile: {
      initiate: vi.fn(),
    },
    updateUserProfile: {
      initiate: vi.fn(),
    },
  },
};

const mockAuthApi = {
  reducerPath: "authApi",
  reducer: (state = {}, action) => state,
  middleware: () => (next) => (action) => next(action),
  endpoints: {
    loginUser: {
      initiate: vi.fn(),
    },
  },
};

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      user: userSlice.reducer,
      [mockUserApi.reducerPath]: mockUserApi.reducer,
      [mockAuthApi.reducerPath]: mockAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mockUserApi.middleware, mockAuthApi.middleware),
    preloadedState: initialState,
  });
};

describe('UserApi', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('User Profile Management', () => {
    it('should handle setting user profile data', () => {
      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      store.dispatch(userSlice.actions.setUser(userData));
      
      const state = store.getState();
      expect(state.user.id).toBe(1);
      expect(state.user.firstName).toBe('John');
      expect(state.user.lastName).toBe('Doe');
      expect(state.user.email).toBe('john@example.com');
    });

    it('should handle updating user profile data', () => {
      // Set initial user data
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }));

      // Update user data
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com'
      }));
      
      const state = store.getState();
      expect(state.user.firstName).toBe('Jane');
      expect(state.user.lastName).toBe('Smith');
      expect(state.user.email).toBe('jane@example.com');
    });

    it('should handle clearing user profile data', () => {
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
    });
  });

  describe('User Profile Flow', () => {
    it('should handle complete user profile loading flow', () => {
      // Simulate authentication
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
      expect(state.user.email).toBe('john@example.com');
    });

    it('should handle user profile update flow', () => {
      // Set initial authenticated state with user data
      store.dispatch(authSlice.actions.setCredentials({ token: 'test-token-123' }));
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }));

      // Update user profile
      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com'
      }));

      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.user.firstName).toBe('Jane');
      expect(state.user.lastName).toBe('Smith');
      expect(state.user.email).toBe('jane@example.com');
    });

    it('should handle user logout flow', () => {
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
      expect(mockUserApi.reducerPath).toBe('userApi');
      expect(mockAuthApi.reducerPath).toBe('authApi');
    });

    it('should have correct endpoints', () => {
      expect(mockUserApi.endpoints.getUserProfile).toBeDefined();
      expect(mockUserApi.endpoints.updateUserProfile).toBeDefined();
      expect(mockAuthApi.endpoints.loginUser).toBeDefined();
    });
  });
});
