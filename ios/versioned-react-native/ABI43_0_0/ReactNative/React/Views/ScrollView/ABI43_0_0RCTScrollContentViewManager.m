/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI43_0_0RCTScrollContentViewManager.h"

#import "ABI43_0_0RCTScrollContentShadowView.h"
#import "ABI43_0_0RCTScrollContentView.h"

@implementation ABI43_0_0RCTScrollContentViewManager

ABI43_0_0RCT_EXPORT_MODULE()

- (ABI43_0_0RCTScrollContentView *)view
{
  return [ABI43_0_0RCTScrollContentView new];
}

- (ABI43_0_0RCTShadowView *)shadowView
{
  return [ABI43_0_0RCTScrollContentShadowView new];
}

@end
