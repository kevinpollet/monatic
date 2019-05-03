/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { None } from "../src/None";
import { fromPromise } from "../src/fromPromise";
import { Some } from "../src/Some";
import { Option } from "../src/Option";

describe("fromPromise", () => {
  it("should return an OptionPromise resolving to None if value is undefined", async () => {
    const promise = Promise.resolve(null);
    const optionPromise = fromPromise(promise);

    expect(await optionPromise.asPromise()).toBe(None);
  });

  it("should return an OptionPromise resolving to None if value is null", async () => {
    const promise = Promise.resolve(undefined);
    const optionPromise = fromPromise(promise);

    expect(await optionPromise.asPromise()).toBe(None);
  });

  it("should return an OptionPromise resolving to Some if value is not undefined or null", async () => {
    const value = 12;
    const promise = Promise.resolve(value);
    const optionPromise = fromPromise(promise);

    expect(await optionPromise.asPromise()).toEqual(Some(value));
  });

  it("should return an OptionPromise resolving to given promise", async () => {
    const option: Option<number> = Some(12);
    const promise = Promise.resolve(option);
    const optionPromise = fromPromise(promise);

    expect(await optionPromise.asPromise()).toBe(option);
  });
});
