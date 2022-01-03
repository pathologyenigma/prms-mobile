#import "GeoLocationModule.h"
#import "OnceLocationManager.h"
#import "PoiKeywordSearchRequest.h"
#import "PoiAroundSearchRequest.h"

#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>

@interface GeoLocationModule ()

@end

@implementation GeoLocationModule

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getLocation:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    OnceLocationManager *locManager = [[OnceLocationManager alloc] init:resolve rejecter:reject];
    [locManager startLocationUpdate];
}

RCT_EXPORT_METHOD(getInputTips:(NSString *)keywords city:(NSString *)city resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    PoiKeywordSearchRequest *request = [[PoiKeywordSearchRequest alloc] init:resolve reject:reject];
    [request searchWithKeyword:keywords city:city];
}

RCT_EXPORT_METHOD(getPoiItems:(nonnull NSNumber *)latitude longitude:(nonnull NSNumber *)longitude poiTypes:(NSString *)poiTypes resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    PoiAroundSearchRequest *request = [[PoiAroundSearchRequest alloc] init:resolve reject:reject];
    [request searchWithLatitude:latitude longitude:longitude poiTypes:poiTypes];
}

@end
