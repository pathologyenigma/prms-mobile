#import "AMapView.h"

#import <React/RCTLog.h>

@interface AMapView () <MAMapViewDelegate>

@end

@implementation AMapView

- (instancetype)init {
    if (self = [super init]) {
        _zoomLevel = 16;
        _centerLatLng = kCLLocationCoordinate2DInvalid;
        [self addSubview:self.mapView];
    }
    return self;
}

- (MAMapView *)mapView {
    if (!_mapView) {
        MAMapView *mapView = [[MAMapView alloc] initWithFrame:self.bounds];
        mapView.centerCoordinate = CLLocationCoordinate2DMake(39.9242, 116.3979);
        mapView.delegate = self;
        mapView.rotateEnabled = NO;
        mapView.rotateCameraEnabled = NO;
        mapView.showsCompass = NO;
        mapView.maxZoomLevel = 20;
        mapView.zoomLevel = 16;
        mapView.showsBuildings = NO;
        
        _mapView = mapView;
    }
    return _mapView;
}

- (void)updateMapStatus {
    if (CLLocationCoordinate2DIsValid(self.centerLatLng)) {
        MAMapStatus *staus = [self.mapView getMapStatus];
        staus.zoomLevel = self.zoomLevel;
        staus.centerCoordinate = self.centerLatLng;
        [self.mapView setMapStatus:staus animated:NO];
    }
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps {
    RCTLogInfo(@"didSetProps: %@", changedProps);
    if (self.initialized) {
        [self updateMapStatus];
    }
}

- (void)mapInitComplete:(MAMapView *)mapView {
    self.initialized = YES;
    [self updateMapStatus];
}

- (void)mapView:(MAMapView *)mapView mapWillMoveByUser:(BOOL)wasUserAction {
    if (!self.initialized) {
        return;
    }
    
    if (self.onMoveStart) {
        MAMapStatus *status = mapView.getMapStatus;
        self.onMoveStart(@{
            @"latitude": @(status.centerCoordinate.latitude),
            @"longitude": @(status.centerCoordinate.longitude),
            @"wasUserAction": @(wasUserAction)
        });
    }
}

- (void)mapView:(MAMapView *)mapView mapDidMoveByUser:(BOOL)wasUserAction {
    if (!self.initialized) {
        return;
    }
    
    if (self.onMoveEnd) {
        MAMapStatus *status = mapView.getMapStatus;
        self.onMoveEnd(@{
           @"latitude": @(status.centerCoordinate.latitude),
           @"longitude": @(status.centerCoordinate.longitude),
           @"wasUserAction": @(wasUserAction)
        });
    }
}

- (void)mapView:(MAMapView *)mapView didSingleTappedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    NSLog(@"%s %f, %f", __FUNCTION__, coordinate.latitude, coordinate.longitude);
    if (self.onSingleTap) {
        self.onSingleTap(@{
           @"latitude": @(coordinate.latitude),
           @"longitude": @(coordinate.longitude),
        });
    }
}


@end
