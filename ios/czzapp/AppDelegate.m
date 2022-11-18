#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AMapFoundationKit/AMapFoundationKit.h>

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
    FlipperClient *client = [FlipperClient sharedClient];
    SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
    [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
    [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
    [client addPlugin:[FlipperKitReactPlugin new]];
    [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
    [client start];
}
#endif

#import <RNReactNativeRoute/HTRouteBridgeManager.h>
#import "MainReactModule.h"
#import <Bugly/Bugly.h>
#import <CodePush/CodePush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
//    InitializeFlipper(application);
#endif

	BOOL isDebug = false;
	#ifdef DEBUG
		isDebug = true;
	#endif
	if (!isDebug) {
		BuglyConfig *config = [[BuglyConfig alloc] init];
		config.reportLogLevel = BuglyLogLevelInfo;
		[Bugly startWithAppId:@"8ed69c67d6" developmentDevice:isDebug config:config];
	}
    
    [AMapServices sharedServices].enableHTTPS = YES;
    [AMapServices sharedServices].apiKey = @"c18f86cde7df6e0700b1d061d96dd008";

    [HTRouteBridgeManager loadBridgeWithURL:[self sourceURLForBridge:nil] moduleName:@"czzapp" launchOptions:launchOptions];
    
    
    UIViewController *rootViewController = [[UIViewController alloc] init];
    rootViewController.view.backgroundColor = [UIColor whiteColor];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    [[[HTRouteBridgeManager shareManager].bridge moduleForName:NSStringFromClass([MainReactModule class]) lazilyLoadIfNecessary:YES] setLaunchScreenContentView];
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

@end
