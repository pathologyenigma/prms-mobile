//
//  HTRefreshHeader.h
//  RNMJRefresh
//
//  Created by hublot on 2022/3/17.
//

#import <Foundation/Foundation.h>
#import <React/RCTScrollableProtocol.h>
#import <MJRefresh/MJRefresh.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNMJRefreshHeader : MJRefreshNormalHeader <RCTCustomRefreshContolProtocol>

@end

NS_ASSUME_NONNULL_END
