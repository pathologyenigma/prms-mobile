#import "AMapViewManager.h"
#import "AMapView.h"

@interface AMapViewManager()

@end

@implementation AMapViewManager

RCT_EXPORT_MODULE(AMapView)

- (UIView *)view {
    return [[AMapView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(centerLatLng, CLLocationCoordinate2D)
RCT_EXPORT_VIEW_PROPERTY(zoomLevel, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onMoveStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMoveEnd, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSingleTap, RCTBubblingEventBlock)


@end
