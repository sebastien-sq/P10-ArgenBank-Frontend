import { expect, describe, it, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../app/slices/authSlice";
import { userSlice } from "../app/slices/userSlice";
import { authApi } from "../app/services/authApi";
import { userApi } from "../app/services/userApi";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch pour les API calls
global.fetch = vi.fn();

describe('Store Configuration', () => {
  let store;

  beforeEach(() => {
    // Créer un nouveau store pour chaque test
    store = configureStore({
      reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
    });
    
    // Reset mocks
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const state = store.getState();
    
    expect(state.auth).toEqual({
      status: "IDLE",
      error: null,
      token: null,
      isAuthenticated: false,
    });
    
    expect(state.user).toEqual({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      status: "IDLE",
      error: null,
    });
  });

  it('should dispatch auth actions correctly', () => {
    // Test setCredentials
    store.dispatch(authSlice.actions.setCredentials({ token: 'test-token' }));
    
    let state = store.getState();
    expect(state.auth.token).toBe('test-token');
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.status).toBe('SUCCEEDED');

    // Test logout
    store.dispatch(authSlice.actions.logout());
    
    state = store.getState();
    expect(state.auth.token).toBe(null);
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.status).toBe('IDLE');

    // Test loginFailed
    store.dispatch(authSlice.actions.loginFailed('Login failed'));
    
    state = store.getState();
    expect(state.auth.error).toBe('Login failed');
    expect(state.auth.status).toBe('FAILED');
    expect(state.auth.isAuthenticated).toBe(false);
  });

  it('should dispatch user actions correctly', () => {
    // Test setUser
    const userData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };
    
    store.dispatch(userSlice.actions.setUser(userData));
    
    let state = store.getState();
    expect(state.user).toEqual({
      ...userData,
      status: "IDLE",
      error: null,
    });

    // Test clearUser
    store.dispatch(userSlice.actions.clearUser());
    
    state = store.getState();
    expect(state.user).toEqual({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      status: "IDLE",
      error: null,
    });
  });
});
