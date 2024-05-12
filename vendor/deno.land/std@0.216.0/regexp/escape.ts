// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

// // For future forward-compatibility with regexp `v` flag, reservedCharMap is
// // autogenerated from the ClassSetReservedDoublePunctuator,
// // ClassSetSyntaxCharacter, and ClassSetReservedPunctuator categories in the
// // draft spec.
// // See https://github.com/tc39/proposal-regexp-v-flag#how-is-the-v-flag-different-from-the-u-flag
// // and https://arai-a.github.io/ecma262-compare/snapshot.html?pr=2418#prod-ClassSetReservedDoublePunctuator
// const reservedChars = [...new Set(['ClassSetReservedDoublePunctuator', 'ClassSetSyntaxCharacter', 'ClassSetReservedPunctuator'].map(n =>
//   document.querySelector(`[name=${n}] emu-rhs`).textContent.replaceAll(/\s/g, '')
// ).join(''))]
// const reservedCharMap = Object.fromEntries(reservedChars
//   .map(x => {
//     try {
//       for (const flag of 'gimsuy') {
//         new RegExp(`\\${x}`, flag)
//         new RegExp(`[\\${x}]`, flag)
//       }
//       return [x, `\\${x}`]
//     } catch (e) {
//       return [x, `\\x${x.codePointAt(0).toString(16).padStart(2, '0')}`]
//     }
//   }))

const reservedCharMap = {
  "&": "\\x26",
  "!": "\\x21",
  "#": "\\x23",
  "$": "\\$",
  "%": "\\x25",
  "*": "\\*",
  "+": "\\+",
  ",": "\\x2c",
  ".": "\\.",
  ":": "\\x3a",
  ";": "\\x3b",
  "<": "\\x3c",
  "=": "\\x3d",
  ">": "\\x3e",
  "?": "\\?",
  "@": "\\x40",
  "^": "\\^",
  "`": "\\x60",
  "~": "\\x7e",
  "(": "\\(",
  ")": "\\)",
  "[": "\\[",
  "]": "\\]",
  "{": "\\{",
  "}": "\\}",
  "/": "\\/",
  "-": "\\x2d",
  "\\": "\\\\",
  "|": "\\|",
};

const RX_REGEXP_ESCAPE = new RegExp(
  `[${Object.values(reservedCharMap).join("")}]`,
  "gu",
);

/**
 * Escapes arbitrary text for interpolation into a regexp, such that it will
 * match exactly that text and nothing else.
 *
 * @example
 * ```ts
 * import { escape } from "https://deno.land/std@$STD_VERSION/regexp/mod.ts";
 * import { assertEquals, assertMatch, assertNotMatch } from "https://deno.land/std@$STD_VERSION/assert/mod.ts";
 *
 * const re = new RegExp(`^${escape(".")}$`, "u");
 *
 * assertEquals("^\\.$", re.source);
 * assertMatch(".", re);
 * assertNotMatch("a", re);
 * ```
 */
export function escape(str: string): string {
  return str.replaceAll(
    RX_REGEXP_ESCAPE,
    (m) => reservedCharMap[m as keyof typeof reservedCharMap],
  );
}