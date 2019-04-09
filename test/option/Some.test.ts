/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { None } from "../../src/option/None";
import { Option } from "../../src/option/Option";
import { Some } from "../../src/option/Some";

describe("Some", () => {
  const value = 12;
  const option: Option<number> = new Some(value);

  describe("exists", () => {
    it("should return true if exist function return true", () => {
      const existFn = jest.fn(() => true);

      expect(option.exists(existFn)).toBeTruthy();
      expect(existFn).toBeCalledTimes(1);
      expect(existFn).toBeCalledWith(value);
    });

    it("should return false if exist function return false", () => {
      const existFn = jest.fn(() => false);

      expect(option.exists(existFn)).toBeFalsy();
      expect(existFn).toBeCalledTimes(1);
      expect(existFn).toBeCalledWith(value);
    });
  });

  describe("filter", () => {
    it("should return Some if predicate function return true", () => {
      const filterFn = jest.fn(() => true);

      expect(option.filter(filterFn)).toBe(option);
      expect(filterFn).toBeCalledTimes(1);
      expect(filterFn).toBeCalledWith(value);
    });

    it("should return None if predicate function return false", () => {
      const filterFn = jest.fn(() => false);

      expect(option.filter(filterFn)).toBe(None.INSTANCE);
      expect(filterFn).toBeCalledTimes(1);
      expect(filterFn).toBeCalledWith(value);
    });
  });

  describe("get", () => {
    it("should return the wrapped value", () =>
      expect(option.get()).toBe(value));
  });

  describe("isEmpty", () => {
    it("should return false", () => expect(option.isEmpty()).toBeFalsy());
  });

  describe("isDefined", () => {
    it("should return tue", () => expect(option.isDefined()).toBeTruthy());
  });

  describe("map", () => {
    it("should return a new Option with the mapped value", () => {
      const mapFn = jest.fn((value: number) => value.toString());
      const newOption = option.map(mapFn);

      expect(newOption).toBeInstanceOf(Some);
      expect(newOption.get()).toBe(value.toString());
      expect(mapFn).toBeCalledTimes(1);
      expect(mapFn).toBeCalledWith(value);
    });
  });
});
