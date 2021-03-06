/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Option } from "./Option";
import { NoSuchElementError } from "./NoSuchElementError";

/**
 * Represents an empty {@link Option}.
 */
export class NoneType<A> implements Option<A> {
  exists(): boolean {
    return false;
  }

  filter(): Option<A> {
    return this;
  }

  filterNot(): Option<A> {
    return this;
  }

  flatMap<B>(): Option<B> {
    const unknownThis = this as unknown;
    return unknownThis as Option<B>;
  }

  fold<B>(defaultValue: B): B {
    return defaultValue;
  }

  forEach(): void {
    return;
  }

  get(): A {
    throw new NoSuchElementError();
  }

  getOrElse(value: A): A {
    return value;
  }

  isDefined(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return true;
  }

  map<B>(): Option<B> {
    const unknownThis = this as unknown;
    return unknownThis as Option<B>;
  }

  match<B>({ None }: { None: () => B }): B {
    return None();
  }

  orElse(option: Option<A>): Option<A> {
    return option;
  }
}
