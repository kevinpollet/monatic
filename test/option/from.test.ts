/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { None } from "../../src/option/None";
import { from } from "../../src/option/from";

describe("from", () => {
  it("should return None if value is undefined", () =>
    expect(from(undefined)).toBe(None));

  it("should return None if value is null", () =>
    expect(from(null)).toBe(None));

  it("should return Some if value is not undefined or null", () =>
    expect(from(2).isDefined()).toBeTruthy());

  it("should return an OptionPromise instance resolving to None if promise resolve to undefined", async () => {
    const resolvedOption = await from(Promise.resolve(undefined)).toPromise();

    expect(resolvedOption).toBe(None);
  });

  it("should return an an OptionPromise instance resolving to None if promise value is null", async () => {
    const resolvedOption = await from(Promise.resolve(null)).toPromise();

    expect(resolvedOption).toBe(None);
  });

  it("should return an OptionPromise instance resolving to Some if promise value is not undefined or null", async () => {
    const resolvedOption = await from(Promise.resolve(12)).toPromise();

    expect(resolvedOption.isDefined()).toBeTruthy();
  });
});
