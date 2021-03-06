/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Option } from "../src/Option";
import { Some } from "../src/Some";
import { None } from "../src/None";

describe("Some", () => {
  const value = 12;
  const option: Option<number> = Some(12);

  describe("constructor", () => {
    it("should throw a TypeError if given value is null", () =>
      expect(() => Some(null as unknown)).toThrow(TypeError));

    it("should throw a TypeError if given value is undefined", () =>
      expect(() => Some(undefined as unknown)).toThrow(TypeError));
  });

  describe("exists", () => {
    it("should return true", () => {
      const fn = jest.fn(v => v === value);

      expect(option.exists(fn)).toBeTruthy();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });

    it("should return false", () => {
      const fn = jest.fn(v => v !== value);

      expect(option.exists(fn)).toBeFalsy();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("filter", () => {
    it("should return this option", () => {
      const fn = jest.fn(v => v === value);

      expect(option.filter(fn)).toBe(option);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });

    it("should return None", () => {
      const fn = jest.fn(v => v !== value);

      expect(option.filter(fn)).toBe(None);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("filterNot", () => {
    it("should return this option", () => {
      const fn = jest.fn(v => v !== value);

      expect(option.filterNot(fn)).toBe(option);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });

    it("should return None", () => {
      const fn = jest.fn(v => v === value);

      expect(option.filterNot(fn)).toBe(None);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("flatMap", () => {
    it("should return the new option", () => {
      const newOption = Some(value.toString());
      const fn = jest.fn(() => newOption);

      expect(option.flatMap(fn)).toBe(newOption);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("fold", () => {
    it("should apply the given function", () => {
      const defaultValue = 12;
      const fn = jest.fn(val => val.toString());

      expect(option.fold(defaultValue, fn)).toBe(value.toString());
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("forEach", () => {
    it("should apply the given side effect function and return this option", () => {
      const option: Option<{ value: number }> = Some({ value });
      const fn = jest.fn(v => (v.value += 1));

      option.forEach(fn);

      expect(option).toBe(option);
      expect(option).toEqual(Some({ value: value + 1 }));
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("get", () => {
    it("should return the option value", () =>
      expect(option.get()).toBe(value));
  });

  describe("getOrElse", () => {
    it("should return the option value", () =>
      expect(option.getOrElse(24)).toBe(value));
  });

  describe("isDefined", () => {
    it("should return true", () => expect(option.isDefined()).toBeTruthy());
  });

  describe("isEmpty", () => {
    it("should return false", () => expect(option.isEmpty()).toBeFalsy());
  });

  describe("map", () => {
    it("should return None if mapped value is null", () => {
      const fn = jest.fn(() => null);

      expect(option.map(fn)).toBe(None);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });

    it("should return None if mapped value is undefined", () => {
      const fn = jest.fn(() => undefined);

      expect(option.map(fn)).toBe(None);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });

    it("should return a defined option with mapped value", () => {
      const fn = jest.fn(v => v.toString());

      expect(option.map(fn)).toEqual(Some(value.toString()));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(value);
    });
  });

  describe("match", () => {
    it("should call Some function", () => {
      const matcher = { None: jest.fn(), Some: jest.fn(() => value + 1) };
      const result = option.match(matcher);

      expect(result).toBe(value + 1);
      expect(matcher.None).not.toBeCalled();
      expect(matcher.Some).toHaveBeenCalledTimes(1);
      expect(matcher.Some).toHaveBeenCalledWith(value);
    });
  });

  describe("orElse", () => {
    it("should return this option", () => {
      const alternative = Some(12);

      expect(option.orElse(alternative)).toBe(option);
    });
  });
});
