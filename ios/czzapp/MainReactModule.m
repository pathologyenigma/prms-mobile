//
//  MainReactModule.m
//  ReactNativeDemo
//
//  Created by hublot on 2022/3/6.
//

#import "MainReactModule.h"
#import <React/RCTConvert.h>
#import <RNReactNativeRoute/HTRouteController.h>
#import <RNReactNativeRoute/UINavigationController+FDFullscreenPopGesture.h>

@implementation MainReactModule

NSInteger IMAGE_VIEW_TAG = 10001;

NSInteger ROOT_CONTROLLER_VIEW_TAG = 10002;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents {
  return nil;
}

- (UIView *)createLaunchScreenView {
	return [[UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil] instantiateInitialViewController].view;
}

- (void)setLaunchScreenContentView {
  [self clearImageAndRootControllerView];
  UIView *rootView = [UIApplication sharedApplication].keyWindow.rootViewController.view;

  UIView *launchScreenView = [self createLaunchScreenView];
  launchScreenView.tag = IMAGE_VIEW_TAG;
  [rootView insertSubview:launchScreenView atIndex:0];
}

- (void)clearImageAndRootControllerView {
  UIView *rootView = [UIApplication sharedApplication].keyWindow.rootViewController.view;
  UIImageView *imageView = [rootView viewWithTag:IMAGE_VIEW_TAG];
  [imageView removeFromSuperview];
  UIView *willRemoveControllerView = [rootView viewWithTag:ROOT_CONTROLLER_VIEW_TAG];
  [willRemoveControllerView removeFromSuperview];
  [((UIViewController *)willRemoveControllerView.nextResponder) removeFromParentViewController];
}

- (UITabBarController *)createTabBarControllerWithComponentRouteOption:(NSDictionary *)componentRouteOption {
  UITabBarController *tabBarController = [[UITabBarController alloc] init];
  tabBarController.tabBar.backgroundColor = [UIColor whiteColor];
  tabBarController.tabBar.unselectedItemTintColor = [UIColor clearColor];
  tabBarController.tabBar.backgroundImage = [[UIImage alloc] init];
  tabBarController.tabBar.shadowImage = [[UIImage alloc] init];
  tabBarController.tabBar.layer.shadowColor = [[UIColor blackColor] colorWithAlphaComponent:0.1].CGColor;
  tabBarController.tabBar.layer.shadowOffset = CGSizeMake(0, 0);
  tabBarController.tabBar.layer.shadowRadius = 50;
  tabBarController.tabBar.layer.shadowOpacity = 1;
//  tabBarController.tabBar.layer.maskedCorners = kCALayerMinXMinYCorner | kCALayerMaxXMinYCorner;
//  tabBarController.tabBar.layer.cornerRadius = 35;

  NSString *titleKey = @"title";
  NSString *fontSizeKey = @"fontSize";
  NSString *colorKey = @"color";
  NSString *selectedColorKey = @"selectedColor";
  NSString *imageKey = @"image";
  NSString *selectedImageKey = @"selectedImage";
  NSString *componentKey = @"componentName";
  NSString *componentOptionListKey = @"componentRouteOptionList";
  NSArray *keyValueList = [componentRouteOption valueForKey:@"itemList"];
  [keyValueList enumerateObjectsUsingBlock:^(NSDictionary *dictionary, NSUInteger index, BOOL * _Nonnull stop) {
    HTRouteController *routeController = [HTRouteController controllerWithComponentName:dictionary[componentKey] componentRouteOptionList:dictionary[componentOptionListKey]];
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:routeController];
    navigationController.fd_viewControllerBasedNavigationBarAppearanceEnabled = false;
    [tabBarController addChildViewController:navigationController];

    routeController.tabBarItem.title = dictionary[titleKey];
    routeController.tabBarItem.image = [[UIImage imageNamed:dictionary[imageKey]] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    routeController.tabBarItem.selectedImage = [[UIImage imageNamed:dictionary[selectedImageKey]] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
//    CGFloat imageInset = tabBarController.tabBar.bounds.size.height > 49 ? 10 : 5;
//    routeController.tabBarItem.imageInsets = UIEdgeInsetsMake(imageInset, 0, -imageInset, 0);
    UIFont *font = [UIFont systemFontOfSize:[dictionary[fontSizeKey] integerValue]];
    [routeController.tabBarItem setTitleTextAttributes:@{
        NSFontAttributeName: font,
        NSForegroundColorAttributeName: [RCTConvert UIColor:dictionary[colorKey]]
    } forState:UIControlStateNormal];
    [routeController.tabBarItem setTitleTextAttributes:@{
        NSFontAttributeName: font,
        NSForegroundColorAttributeName: [RCTConvert UIColor:dictionary[selectedColorKey]]
    } forState:UIControlStateSelected];

  }];
  return tabBarController;
}

- (UINavigationController *)createNavigationControllerWithComponentName:(NSString *)componentName componentRouteOption:(NSDictionary *)componentRouteOption {
  HTRouteController *routeController = [HTRouteController controllerWithComponentName:componentName componentRouteOptionList:componentRouteOption];
  UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:routeController];
  [navigationController.view insertSubview:[self createLaunchScreenView] atIndex:0];
  navigationController.fd_viewControllerBasedNavigationBarAppearanceEnabled = false;
  return navigationController;
}

RCT_EXPORT_METHOD(reloadRootViewController:(NSString *)componentName componentRouteOption:(NSDictionary *)componentRouteOption) {
  [self clearImageAndRootControllerView];
  UIViewController *willAppendController = nil;
  if (componentName != nil) {
    willAppendController = [self createNavigationControllerWithComponentName:componentName componentRouteOption:componentRouteOption];
  } else if (componentRouteOption != nil) {
    willAppendController = [self createTabBarControllerWithComponentRouteOption:componentRouteOption];
  } else {
    return;
  }
  UIViewController *rootController = [UIApplication sharedApplication].keyWindow.rootViewController;
  UIView *rootView = rootController.view;
  willAppendController.view.tag = ROOT_CONTROLLER_VIEW_TAG;
  [rootView insertSubview:willAppendController.view atIndex:0];
  [rootController addChildViewController:willAppendController];
}

RCT_EXPORT_METHOD(restartBundleBridgeManager) {
  [self setLaunchScreenContentView];
}

@end
