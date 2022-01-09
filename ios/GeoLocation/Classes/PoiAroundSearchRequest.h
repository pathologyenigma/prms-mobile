#import <AMapSearchKit/AMapSearchKit.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface PoiAroundSearchRequest : AMapPOIAroundSearchRequest

- (instancetype)init:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;

- (void)searchWithLatitude:(NSNumber *)latitude longitude:(NSNumber *)longitude poiTypes:(NSString *)poiTypes;

@end

NS_ASSUME_NONNULL_END
