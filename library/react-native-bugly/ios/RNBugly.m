
#import "RNBugly.h"
#import <Bugly/Bugly.h>

@implementation RNBugly

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+ (void)startWithAppId
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [Bugly startWithAppId:nil];
    });
}

RCT_EXPORT_METHOD(log:(NSString *)level tag:(NSString *)tag log:(NSString *)log) {
    NSDictionary *levelList = @{
        @"v": @(BuglyLogLevelVerbose),
        @"d": @(BuglyLogLevelDebug),
        @"i": @(BuglyLogLevelInfo),
        @"w": @(BuglyLogLevelWarn),
        @"e": @(BuglyLogLevelError),
    };
    BuglyLogLevel reloadLevel = [[levelList valueForKey:level] intValue];;
    [BuglyLog level:reloadLevel tag:tag log:@"%@", log];
}

RCT_EXPORT_METHOD(setUserIdentifier:(NSString *)userId)
{
    [Bugly setUserIdentifier:userId];
}

RCT_EXPORT_METHOD(updateAppVersion:(NSString *)version)
{
    [Bugly updateAppVersion:version];
}

//设置标签，可在网站生成标签ID
RCT_EXPORT_METHOD(setTag:(NSUInteger)tag)
{
    [Bugly setTag:tag];
}

RCT_EXPORT_METHOD(postException:(NSDictionary *)valueList)
{
    NSInteger category = [[valueList valueForKey:@"category"] integerValue];
    NSString *errorType = [valueList valueForKey:@"errorType"];
    NSString *errorMsg = [valueList valueForKey:@"errorMsg"];
    NSString *stack = [valueList valueForKey:@"stack"];
    [Bugly reportExceptionWithCategory:category
                                  name:errorType
                                reason:errorMsg
                             callStack:[stack componentsSeparatedByString:@"\n"]
                             extraInfo:@{}
                          terminateApp:false];
}

@end
  
