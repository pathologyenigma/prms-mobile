#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "SplashWindow.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, SplashDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) SplashWindow *splashWindow;

@end
