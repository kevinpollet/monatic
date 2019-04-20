/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Option } from "../src/Option";
import { Some } from "../src/Some";

describe("Some", () => {
  const value = 12;
  const option: Option<number> = Some(12);

  describe("get", () => {
    it("should return the wrapped value", () =>
      expect(option.get()).toBe(value));
  });

  describe("getOrElse", () => {
    it("should return the wrapped value", () =>
      expect(option.getOrElse(24)).toBe(value));
  });

  describe("pipe", () => {
    it("should return Some containing the returned value", () =>
      expect(option.pipe(x => x * 2)).toEqual(Some(24)));

    it("should return the returned Option", () => {
      const newOption = Some(12);

      expect(option.pipe(() => newOption)).toBe(newOption);
    });
  });
});
