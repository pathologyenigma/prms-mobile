#import "SystemModule.h"
#import <UIKit/UIKit.h>

@implementation SystemModule

RCT_EXPORT_MODULE();

static NSString *const kLanguageSetKey = @"language";

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSDictionary *)constantsToExport {
    NSUserDefaults *std = [NSUserDefaults standardUserDefaults];
    CGSize size = [UIScreen mainScreen].bounds.size;
    CGFloat height = [UIApplication sharedApplication].statusBarFrame.size.height;
    NSString *null = @"";
    NSString *language = [std stringForKey:kLanguageSetKey] ?: null;
    if ([null isEqualToString:language]) {
        language = [[NSLocale preferredLanguages] firstObject];
    }
    return @{
        @"language": language,
        @"width": @(size.width),
        @"height": @(size.height),
        @"safeTop": @(height),
        @"safeBottom": height == 20 ? @(0) : @(34),
        @"os": @"ios"
    };
}

RCT_EXPORT_METHOD(setValueWithKey: (NSString *)key value: (NSString *) value) {
    NSUserDefaults *sdt = [NSUserDefaults standardUserDefaults];
    [sdt setObject:value forKey:key];
    [sdt synchronize];
}


RCT_EXPORT_METHOD(removeWithKey: (NSArray<NSString *> *)keys) {
    if ([keys count] <= 0) {
        return;
    }
    NSUserDefaults *sdt = [NSUserDefaults standardUserDefaults];
    for (NSString *key in keys) {
        [sdt removeObjectForKey:key];
    }
    [sdt synchronize];
}

RCT_EXPORT_METHOD(getValueWithKey: (NSArray<NSString *> *)keys callback: (RCTResponseSenderBlock) callback) {
    if ([keys count] <= 0) {
        callback(@[@{}]);
    } else {
        NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        NSUserDefaults *sdt = [NSUserDefaults standardUserDefaults];
        for (NSString *key in keys) {
            dict[key] = [sdt objectForKey:key];
        }
        callback(@[dict]);
    }
}

RCT_EXPORT_METHOD(clear) {
    NSUserDefaults *sdt = [NSUserDefaults standardUserDefaults];
    NSDictionary *dict = [sdt dictionaryRepresentation];
    for (id key in dict) {
        [sdt removeObjectForKey:key];
    }
    [sdt synchronize];
}

@end
