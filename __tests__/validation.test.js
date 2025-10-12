import { expect, describe, it } from "vitest";
import { isValidEmail, isValidPassword, isValidFirstName, isValidLastName } from "../app/utils/validateForm";

describe('Validation Functions', () => {
  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test123@test.org')).toBe(true);
      expect(isValidEmail('a@b.c')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('testtestcom')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@test.com')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test .com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should validate correct password formats', () => {
      expect(isValidPassword('test123')).toBe(true);
      expect(isValidPassword('password1')).toBe(true);
      expect(isValidPassword('abc123')).toBe(true);
      expect(isValidPassword('Test123')).toBe(true);
    });

    it('should reject invalid password formats', () => {
      expect(isValidPassword('test')).toBe(false); // pas de chiffre
      expect(isValidPassword('123')).toBe(false); // pas de lettre
      expect(isValidPassword('ab')).toBe(false); // trop court
      expect(isValidPassword('test123!')).toBe(false); // caractère spécial
      expect(isValidPassword('test 123')).toBe(false); // espace
      expect(isValidPassword('')).toBe(false); // vide
    });
  });

  describe('isValidFirstName', () => {
    it('should validate correct first names', () => {
      expect(isValidFirstName('John')).toBe(true);
      expect(isValidFirstName('Mary')).toBe(true);
      expect(isValidFirstName('Jean-Pierre')).toBe(false); // tiret
      expect(isValidFirstName('José')).toBe(false); // accent
    });

    it('should reject invalid first names', () => {
      expect(isValidFirstName('Jo')).toBe(false); // trop court
      expect(isValidFirstName('John123')).toBe(false); // chiffres
      expect(isValidFirstName('John Doe')).toBe(false); // espace
      expect(isValidFirstName('')).toBe(false); // vide
    });
  });

  describe('isValidLastName', () => {
    it('should validate correct last names', () => {
      expect(isValidLastName('Doe')).toBe(true);
      expect(isValidLastName('Smith')).toBe(true);
    });

    it('should reject invalid last names', () => {
      expect(isValidLastName('Do')).toBe(false); // trop court
      expect(isValidLastName('Doe123')).toBe(false); // chiffres
      expect(isValidLastName('Van Der Berg')).toBe(false); // espaces
      expect(isValidLastName('')).toBe(false); // vide
    });
  });
});
