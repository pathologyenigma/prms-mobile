#import "PoiKeywordSearchRequest.h"
#import <React/RCTLog.h>

static NSString * const ErrorCode = @"GeoLocationModulePoiKeywordSearchRequest";

@interface PoiKeywordSearchRequest () <AMapSearchDelegate>

@property(nonatomic, strong) AMapSearchAPI *search;
@property (nonatomic, copy) RCTPromiseResolveBlock resolve;
@property (nonatomic, copy) RCTPromiseRejectBlock reject;

@end

@implementation PoiKeywordSearchRequest

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

- (void)searchWithKeyword:(NSString *)keyword city:(NSString *)city {
    self.keywords         = keyword;
    self.city             = city;
    self.offset           = 10;
    self.requireExtension = YES;
    [self.search AMapPOIKeywordsSearch:self];
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
