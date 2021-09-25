/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type TypeOfMode = number;

// 0 同步渲染模式
export const NoMode = 0b0000;
// 1 严格模式
export const StrictMode = 0b0001;
// 10 异步渲染过渡模式
export const BlockingMode = 0b0010;
// 100 异步渲染模式
export const ConcurrentMode = 0b0100;
// 1000 性能测试模式
export const ProfileMode = 0b1000;
