#import <AMapSearchKit/AMapSearchKit.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface PoiKeywordSearchRequest : AMapPOIKeywordsSearchRequest

- (instancetype)init:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;

- (void)searchWithKeyword:(NSString *)keyword city:(NSString *)city;

@end

NS_ASSUME_NONNULL_END
