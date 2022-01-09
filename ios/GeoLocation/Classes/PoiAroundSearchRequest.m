#import "PoiAroundSearchRequest.h"
#import <React/RCTLog.h>

static NSString * const ErrorCode = @"GeoLocationModulePoiAroundSearchRequest";

@interface PoiAroundSearchRequest () <AMapSearchDelegate>

@property(nonatomic, strong) AMapSearchAPI *search;
@property (nonatomic, copy) RCTPromiseResolveBlock resolve;
@property (nonatomic, copy) RCTPromiseRejectBlock reject;

@end

@implementation PoiAroundSearchRequest

- (instancetype)init:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    if (self = [super init]) {
        _resolve = resolve;
        _reject = reject;
        _search = [[AMapSearchAPI alloc] init];
        _search.delegate = self;
    }
    return self;
}

- (void)dealloc {
    RCTLogInfo(@"%s", __FUNCTION__);
}

- (void)searchWithLatitude:(NSNumber *)latitude longitude:(NSNumber *)longitude poiTypes:(NSString *)poiTypes {
    self.location            = [AMapGeoPoint locationWithLatitude:latitude.floatValue longitude:longitude.floatValue];
    self.radius              = 1000;
    self.types               = poiTypes;
    /* 按照距离排序. */
    self.sortrule            = 0;
    self.offset              = 10;
    self.requireExtension    = YES;
    [self.search AMapPOIAroundSearch:self];
}

- (void)onPOISearchDone:(AMapPOISearchBaseRequest *)request response:(AMapPOISearchResponse *)response {
    NSMutableArray *array = [NSMutableArray array];
    for (AMapPOI *poi in response.pois) {
        NSDictionary *dict = @{
            @"adcode": RCTNullIfNil(poi.adcode),
            @"name": RCTNullIfNil(poi.name),
            @"address": RCTNullIfNil(poi.address),
            @"city": RCTNullIfNil(poi.city),
            @"province": RCTNullIfNil(poi.province),
            @"district": RCTNullIfNil(poi.district),
            @"latitude": @(poi.location.latitude),
            @"longitude": @(poi.location.longitude),
            @"poiID": RCTNullIfNil(poi.uid),
            @"typeCode": RCTNullIfNil(poi.typecode),
            @"typeDes": RCTNullIfNil(poi.type),
        };
        [array addObject:dict];
    }
    self.resolve(array);
}

- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error {
    RCTLogInfo(@"%s, %@", __FUNCTION__, error);
    self.reject(ErrorCode, error.localizedDescription, nil);
}

@end
