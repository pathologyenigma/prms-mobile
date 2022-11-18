#import "OnceLocationManager.h"
#import <React/RCTLog.h>

static NSString * const ErrorCode = @"GeoLocationModuleOnceLocationManager";

@interface OnceLocationManager () <AMapLocationManagerDelegate>

@property(nonatomic, strong) AMapLocationManager *locationManager;
@property(nonatomic, copy) RCTPromiseResolveBlock resolve;
@property(nonatomic, copy) RCTPromiseRejectBlock reject;

@end

@implementation OnceLocationManager

- (instancetype)init:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    if (self = [super init]) {
        _resolve = resolve;
        _reject = reject;
        _locationManager = [[AMapLocationManager alloc] init];
        _locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters;
        _locationManager.locationTimeout = 2;
        _locationManager.delegate = self;
        // 返回地址信息
        _locationManager.locatingWithReGeocode = YES;
    }
    return self;
}

- (void)dealloc {
    RCTLogInfo(@"%s", __FUNCTION__);
}

- (void)startLocationUpdate {
    RCTLogInfo(@"[OnceLocationManager] startLocationUpdate");
    [self.locationManager requestLocationWithReGeocode:YES completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
        if (error) {
            RCTLogInfo(@"[OnceLocationManager] %@", error);
            self.reject(ErrorCode, error.localizedDescription, nil);
            return;
        }
        RCTLogInfo(@"[OnceLocationManager] %@, %@", location, regeocode);
        self.resolve([self dataFromLocation:location reGeocode:regeocode]);
        
    }];
}

- (void)amapLocationManager:(AMapLocationManager *)manager doRequireLocationAuth:(CLLocationManager *)locationManager {
    if (manager.allowsBackgroundLocationUpdates) {
        [locationManager requestAlwaysAuthorization];
    } else {
        [locationManager requestWhenInUseAuthorization];
    }
}

- (void)amapLocationManager:(AMapLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
    NSDictionary *map = @{
        @(kCLAuthorizationStatusNotDetermined): @"kCLAuthorizationStatusNotDetermined",
        @(kCLAuthorizationStatusRestricted): @"kCLAuthorizationStatusRestricted",
        @(kCLAuthorizationStatusDenied): @"kCLAuthorizationStatusDenied",
        @(kCLAuthorizationStatusAuthorizedAlways): @"kCLAuthorizationStatusAuthorizedAlways",
        @(kCLAuthorizationStatusAuthorizedWhenInUse): @"kCLAuthorizationStatusAuthorizedWhenInUse",
    };
    RCTLogInfo(@"%s, %@", __FUNCTION__ , map[@(status)]);
}

- (NSDictionary *)dataFromLocation:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeoCode {
    NSMutableDictionary *result = [@{
             @"latitude":  @(location.coordinate.latitude),
             @"longitude": @(location.coordinate.longitude),
             @"accuracy":  @(location.horizontalAccuracy),
             @"timestamp": @((long)location.timestamp.timeIntervalSince1970 * 1000)
             } mutableCopy];
    
    if (reGeoCode && reGeoCode.adcode) {
        NSDictionary *extras = @{
            @"adcode": reGeoCode.adcode,
            @"province": RCTNullIfNil(reGeoCode.province),
            @"city": RCTNullIfNil(reGeoCode.city),
            @"district": RCTNullIfNil(reGeoCode.district),
            @"name": RCTNullIfNil(reGeoCode.POIName),
            
            // 以下信息仅供调试
            @"address": RCTNullIfNil(reGeoCode.formattedAddress),
            @"street": RCTNullIfNil(reGeoCode.street),
            @"streetNum": RCTNullIfNil(reGeoCode.number),
        };
        
        [result addEntriesFromDictionary:extras];
    }
    
    return result;
}

@end
