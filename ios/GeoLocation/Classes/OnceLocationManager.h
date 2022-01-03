#import <AMapLocationKit/AMapLocationKit.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface OnceLocationManager : NSObject

- (instancetype)init:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (void)startLocationUpdate;

@end

NS_ASSUME_NONNULL_END
