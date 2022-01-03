
#import <React/RCTView.h>
#import <MAMapKit/MAMapKit.h>

@interface AMapView : RCTView

@property(nonatomic, copy) RCTBubblingEventBlock onMoveEnd;
@property(nonatomic, copy) RCTBubblingEventBlock onMoveStart;
@property(nonatomic, copy) RCTBubblingEventBlock onSingleTap;

@property(nonatomic, assign) CLLocationCoordinate2D centerLatLng;
@property(nonatomic, assign) CGFloat zoomLevel;
@property(nonatomic, assign) BOOL scrollEnabled;

@property (nonatomic, strong) MAMapView *mapView;
@property (nonatomic, assign, getter=isInitialized) BOOL initialized;

@end
