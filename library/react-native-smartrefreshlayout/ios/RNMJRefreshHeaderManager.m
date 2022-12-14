#import "RNMJRefreshHeaderManager.h"
#import "RNMJRefreshHeader.h"
#import <React/RCTUIManager.h>

@interface RNMJRefreshHeaderManager ()

@end

@implementation RNMJRefreshHeaderManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL)

RCT_EXPORT_METHOD(setNativeRefreshing:(nonnull NSNumber *)viewTag toRefreshing:(BOOL)refreshing) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[viewTag];
        if (![view isKindOfClass:[RNMJRefreshHeader class]]) {
            return;
        }
        RNMJRefreshHeader *refreshHeader = (RNMJRefreshHeader *)view;
        if (refreshing) {
            [refreshHeader beginRefreshing];
        } else {
            [refreshHeader endRefreshing];
        }
    }];
}

- (UIView *)view {
    RNMJRefreshHeader *view = [[RNMJRefreshHeader alloc] init];
    view.mj_h = MJRefreshHeaderHeight + 10;
    view.ignoredScrollViewContentInsetTop = 5;
    return view;
}


@end
  
