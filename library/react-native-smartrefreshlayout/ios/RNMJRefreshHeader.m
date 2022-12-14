//
//  HTRefreshHeader.m
//  RNMJRefresh
//
//  Created by hublot on 2022/3/17.
//

#import "RNMJRefreshHeader.h"

@implementation RNMJRefreshHeader

- (RCTDirectEventBlock)onRefresh {
    return nil;
}

- (void)setOnRefresh:(RCTDirectEventBlock)onRefresh {
    self.refreshingBlock = ^() {
        if (onRefresh != nil) {
            onRefresh(@{});
        }
    };
}

- (void)setScrollView:(UIScrollView *)scrollView {
    scrollView.mj_header = self;
}

- (void)reactSetFrame:(CGRect)frame {

}

@end
