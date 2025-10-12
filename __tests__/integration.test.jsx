import { expect, describe, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
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

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      user: userSlice.reducer,
      [mockAuthApi.reducerPath]: mockAuthApi.reducer,
      [mockUserApi.reducerPath]: mockUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mockAuthApi.middleware, mockUserApi.middleware),
    preloadedState: initialState,
  });
};

const TestWrapper = ({ children, store }) => (
  <Provider store={store}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </Provider>
);

describe('Authentication Integration Tests', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
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
      expect(state.user.email).toBe('john@example.com');
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

  describe('User Profile Management', () => {
    it('should handle user profile updates', () => {
      // Set initial user data
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
      expect(state.user.firstName).toBe('Jane');
      expect(state.user.lastName).toBe('Smith');
      expect(state.user.email).toBe('jane@example.com');
    });

    it('should handle user profile clearing', () => {
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

  describe('State Management', () => {
    it('should maintain consistent state across actions', () => {
      // Test multiple state transitions
      store.dispatch(authSlice.actions.setCredentials({ token: 'token-1' }));
      expect(store.getState().auth.isAuthenticated).toBe(true);

      store.dispatch(userSlice.actions.setUser({
        id: 1,
        firstName: 'User',
        lastName: 'One',
        email: 'user1@example.com'
      }));
      expect(store.getState().user.firstName).toBe('User');

      store.dispatch(authSlice.actions.logout());
      expect(store.getState().auth.isAuthenticated).toBe(false);

      store.dispatch(userSlice.actions.clearUser());
      expect(store.getState().user.firstName).toBeNull();
    });
  });
});
