import { expect, describe, it, beforeEach, vi } from "vitest";
import { authSlice } from "../app/slices/authSlice";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('AuthSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      status: "IDLE",
      error: null,
      token: null,
      isAuthenticated: false,
    };
    vi.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setCredentials action', () => {
    it('should handle setCredentials', () => {
      const token = 'test-token-123';
      const action = authSlice.actions.setCredentials({ token });
      const newState = authSlice.reducer(initialState, action);

      expect(newState).toEqual({
        status: "SUCCEEDED",
        error: null,
        token: token,
        isAuthenticated: true,
      });
    });

    it('should handle setCredentials with empty token', () => {
      const action = authSlice.actions.setCredentials({ token: '' });
      const newState = authSlice.reducer(initialState, action);

      expect(newState).toEqual({
        status: "SUCCEEDED",
        error: null,
        token: '',
        isAuthenticated: true,
      });
    });
  });

  describe('logout action', () => {
    it('should handle logout', () => {
      const stateWithToken = {
        status: "SUCCEEDED",
        error: null,
        token: 'test-token-123',
        isAuthenticated: true,
      };

      localStorageMock.getItem.mockReturnValue('test-token-123');
      
      const action = authSlice.actions.logout();
      const newState = authSlice.reducer(stateWithToken, action);

      expect(newState).toEqual({
        status: "IDLE",
        error: null,
        isAuthenticated: false,
        token: null,
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle logout when no token in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const action = authSlice.actions.logout();
      const newState = authSlice.reducer(initialState, action);

      expect(newState).toEqual({
        status: "IDLE",
        error: null,
        isAuthenticated: false,
        token: null,
      });

      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });
  });

  describe('loginFailed action', () => {
    it('should handle loginFailed', () => {
      const errorMessage = 'Invalid credentials';
      const action = authSlice.actions.loginFailed(errorMessage);
      const newState = authSlice.reducer(initialState, action);

      expect(newState).toEqual({
        status: "FAILED",
        error: errorMessage,
        isAuthenticated: false,
        token: null,
      });
    });

    it('should handle loginFailed with empty error', () => {
      const action = authSlice.actions.loginFailed('');
      const newState = authSlice.reducer(initialState, action);

      expect(newState).toEqual({
        status: "FAILED",
        error: '',
        isAuthenticated: false,
        token: null,
      });
    });
  });

  describe('state transitions', () => {
    it('should transition from IDLE to SUCCEEDED on successful login', () => {
      const loginAction = authSlice.actions.setCredentials({ token: 'token' });
      const state = authSlice.reducer(initialState, loginAction);
      
      expect(state.status).toBe('SUCCEEDED');
      expect(state.isAuthenticated).toBe(true);
    });

    it('should transition from SUCCEEDED to IDLE on logout', () => {
      const loggedInState = {
        status: "SUCCEEDED",
        error: null,
        token: 'token',
        isAuthenticated: true,
      };

      const logoutAction = authSlice.actions.logout();
      const state = authSlice.reducer(loggedInState, logoutAction);
      
      expect(state.status).toBe('IDLE');
      expect(state.isAuthenticated).toBe(false);
    });

    it('should transition from IDLE to FAILED on login failure', () => {
      const failedAction = authSlice.actions.loginFailed('Error');
      const state = authSlice.reducer(initialState, failedAction);
      
      expect(state.status).toBe('FAILED');
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
