import { expect, describe, it, beforeEach } from "vitest";
import { userSlice } from "../app/slices/userSlice";

describe('UserSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      status: "IDLE",
      error: null,
    };
  });

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setUser action', () => {
    it('should handle setUser with complete user data', () => {
      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      const action = userSlice.actions.setUser(userData);
      const newState = userSlice.reducer(initialState, action);

      expect(newState).toEqual({
        ...userData,
        status: "IDLE",
        error: null,
      });
    });

    it('should handle setUser with partial user data', () => {
      const userData = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com'
      };

      const action = userSlice.actions.setUser(userData);
      const newState = userSlice.reducer(initialState, action);

      expect(newState.id).toBe(2);
      expect(newState.firstName).toBe('Jane');
      expect(newState.lastName).toBe('Smith');
      expect(newState.email).toBe('jane.smith@example.com');
    });

    it('should handle setUser with empty strings', () => {
      const userData = {
        id: 3,
        firstName: '',
        lastName: '',
        email: ''
      };

      const action = userSlice.actions.setUser(userData);
      const newState = userSlice.reducer(initialState, action);

      expect(newState).toEqual({
        ...userData,
        status: "IDLE",
        error: null,
      });
    });

    it('should overwrite existing user data', () => {
      const existingState = {
        id: 1,
        firstName: 'Old',
        lastName: 'Name',
        email: 'old@example.com',
        status: "IDLE",
        error: null,
      };

      const newUserData = {
        id: 2,
        firstName: 'New',
        lastName: 'Name',
        email: 'new@example.com'
      };

      const action = userSlice.actions.setUser(newUserData);
      const newState = userSlice.reducer(existingState, action);

      expect(newState).toEqual({
        ...newUserData,
        status: "IDLE",
        error: null,
      });
    });
  });

  describe('clearUser action', () => {
    it('should handle clearUser from initial state', () => {
      const action = userSlice.actions.clearUser();
      const newState = userSlice.reducer(initialState, action);

      expect(newState).toEqual({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        status: "IDLE",
        error: null,
      });
    });

    it('should handle clearUser from populated state', () => {
      const populatedState = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        status: "SUCCEEDED",
        error: 'Some error',
      };

      const action = userSlice.actions.clearUser();
      const newState = userSlice.reducer(populatedState, action);

      expect(newState).toEqual({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        status: "IDLE",
        error: null,
      });
    });

    it('should reset all user fields to null', () => {
      const stateWithData = {
        id: 42,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        status: "SUCCEEDED",
        error: null,
      };

      const action = userSlice.actions.clearUser();
      const newState = userSlice.reducer(stateWithData, action);

      expect(newState.id).toBeNull();
      expect(newState.firstName).toBeNull();
      expect(newState.lastName).toBeNull();
      expect(newState.email).toBeNull();
      expect(newState.status).toBe("IDLE");
      expect(newState.error).toBeNull();
    });
  });

  describe('state immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState };
      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      const action = userSlice.actions.setUser(userData);
      userSlice.reducer(originalState, action);

      expect(originalState).toEqual(initialState);
    });

    it('should create new state objects', () => {
      const userData = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      const action = userSlice.actions.setUser(userData);
      const newState = userSlice.reducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState).not.toEqual(initialState);
    });
  });
});
