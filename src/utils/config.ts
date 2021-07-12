// 开发环境
// export const hostUri = 'https://p999084-u495-9e172313.api.tiancai.run/api/v1'

// 预发布环境(testflight使用)
export const hostUri = 'https://p777084-u495-15a7ccde.api.tiancai.run/api/v1'

// 生产环境(应用市场使用)
// export const hostUri = 'https://api.dexterprogram.com/api/v1'

export const isDevTag = hostUri === 'https://p999084-u495-9e172313.api.tiancai.run/api/v1'

export const version = '1.0.0'
export const buildVersion = 36

export const xunfeiRecognizerAppId = '5fc11524'
export const oneSignalAppId = '8412e884-003a-4586-8ed6-ab27b37cb8ce'

export const privacyPdfUri = 'https://dextermemory.com/Dexter_Neuro_Learning_Systems_Privacy_Policy.pdf'

// 注册接口
export const Send_Register_Email_Uri = `${hostUri}/verification/email/send`
export const Send_Register_SMS_Uri = `${hostUri}/verification/sms/send`
export const Register_User_with_Email_Verification_Uri = `${hostUri}/auth/user/register/email`
export const Register_User_with_SMS_Verification_Uri = `${hostUri}/auth/user/register/mobile`

// 登录接口
export const Login_Email_Uri = `${hostUri}/auth/user/login/email`
export const Login_Mobile_Phone_Number_Uri = `${hostUri}/auth/user/login/mobile`
// 重置密码
export const Send_Reset_Password_Email_Uri = `${hostUri}/verification/email/send`
export const Send_Reset_Password_SMS_Uri = `${hostUri}/verification/sms/send`
export const Reset_Password_with_Email_Verification_Uri = `${hostUri}/auth/user/resetpassword/email`
export const Reset_Password_with_SMS_Verification_Uri = `${hostUri}/auth/user/resetpassword/mobile`
// 修改密码
export const Change_Password_Uri = `${hostUri}/users/changepassword`
// in game message
export const In_Game_Message = `${hostUri}/message/unread`
export const In_Game_Message_Do = `${hostUri}/message`

// 个人信息
export const Get_Self_User_Uri = `${hostUri}/users/me`
export const Bind_Self_User_Uri = `${hostUri}/users/bind`
export const Get_Self_Hints_Uri = `${hostUri}/users/me/hints`
export const Get_Avatar_signature = `${hostUri}/oss/signature`
export const Skip_Main_section = `${hostUri}/users/section/skip`
export const Streak_Rward = `${hostUri}/streak/reward` // 签到奖励
export const Get_User_Property = `${hostUri}/users/me/property` // 获取用户的资产信息
export const Get_User_Badge = `${hostUri}/users/me/badge` // 获取用户的徽章
export const Update_User_Badge = `${hostUri}/badge/tier-up` // 升级用户的徽章
export const Bing_allysian_id = `${hostUri}/users/me/bind-allysian` // 绑定 allysianid
export const Get_User_location = `${hostUri}/countries/location` // 获取用户的个人信息

// 主线任务
export const Game_Main = `${hostUri}/level/main`
export const Get_Section_Content = `${hostUri}/section`
// 副线任务
export const Game_Side = `${hostUri}/level/side`

// content step
export const Section_Step = `${hostUri}/content-step`
export const ConfirmUnderstand = `${hostUri}/level`

// 各 step 分数检查接口 
export const Check_picture_sequence = `${hostUri}/content-step/picture-sequence/check`
export const Check_dot_to_dot = `${hostUri}/content-step/dot-to-dot/check`
export const Check_audio_record = `${hostUri}/content-step/audio-record/check`
export const Check_picture_association = `${hostUri}/content-step/picture-association/check`
export const Check_pick_items = `${hostUri}/content-step/pick-items/check`
export const Check_item_in_sequence = `${hostUri}/content-step/item-in-sequence/check`
export const Check_cicle_mc = `${hostUri}/content-step/circle-mc/check`
export const Check_mc = `${hostUri}/content-step/mc/check`
export const Check_bingo_one = `${hostUri}/content-step/bingo1/check`
export const Check_bingo_two = `${hostUri}/content-step/bingo2/check`
export const Check_Section = `${hostUri}/section`

// 商店接口:钻石/钻石购买/鱼币/鱼币购买
export const Get_DiamondList = `${hostUri}/shop/diamond`
export const Buy_Diamond = `${hostUri}/shop/diamond/buy`
export const Get_FishList = `${hostUri}/shop/fish`
export const Buy_Fish = `${hostUri}/shop/fish/buy`
// 兑换兑换码
export const Claim_Unicode = `${hostUri}/unicode/claim`

// 排行榜
export const Get_LeaderboardList = `${hostUri}/leaderboard/list`
export const Get_CurrentSeason = `${hostUri}/season/current`
export const Get_UserLeaderboard = `${hostUri}/users/me/leaderboard`