//
//  MainReactModule.h
//  ReactNativeDemo
//
//  Created by hublot on 2022/3/6.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface MainReactModule : RCTEventEmitter <RCTBridgeModule>

- (void)setLaunchScreenContentView;

@end

NS_ASSUME_NONNULL_END
