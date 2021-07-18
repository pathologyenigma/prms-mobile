"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Login_style_1 = require("./styles/Login.style");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var actions = require("../../action/loginAction");
var LoginInputComponent_1 = require("./LoginInputComponent");
var NextTouchableOpacity_1 = require("../components/NextTouchableOpacity");
var rootLoading_1 = require("../../utils/rootLoading");
var WhiteContentModal_1 = require("../components/WhiteContentModal");
var GradientButton_1 = require("../components/GradientButton");
var system_1 = require("../../utils/system");
var ForgetPassword = /** @class */ (function (_super) {
    __extends(ForgetPassword, _super);
    function ForgetPassword(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loginType: 2,
            passwordShow: false,
            showRegisterTips: false,
            showPrivacyTips: false,
            phone: '',
            password: ''
        };
        return _this;
    }
    ForgetPassword.prototype.componentWillUnmount = function () {
        var reset_reducer = this.props.reset_reducer;
        reset_reducer();
    };
    ForgetPassword.prototype.requestLogin = function () {
        var phone = this.state.phone;
        if (!phone) {
            rootLoading_1["default"].fail('请先输入手机号码');
            return;
        }
        // TODO 哪些场景会弹出 用户协议和隐私政策 的提示 modal
        this.setState({ showPrivacyTips: true });
    };
    ForgetPassword.prototype.renderOneClickLogin = function () {
        var _this = this;
        var _a = this.props, dispatch = _a.dispatch, update_kv = _a.update_kv;
        var phone = this.state.phone;
        return (react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].oneClickLoginView },
            react_1["default"].createElement(react_native_1.Image, { style: Login_style_1["default"].logoImg, source: require('../../assets/czzlogo.png') }),
            react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].logoText }, "\u4E3A\u60A8\u63D0\u4F9B\u4F18\u8D28\u7684\u4EBA\u529B\u8D44\u6E90\u670D\u52A1"),
            react_1["default"].createElement(LoginInputComponent_1["default"], { cellStyle: Login_style_1["default"].oneClickLoginStyle, title: "+86", inputProps: {
                    value: phone,
                    placeholder: '请输入您的手机号码',
                    onChangeText: function (value) {
                        _this.setState({ phone: value });
                    }
                } }),
            react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].loginBtn, onPress: function () {
                    rootLoading_1["default"].info('一键登录');
                } },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].loginText }, "\u4E00\u952E\u767B\u5F55")),
            react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].passwordLogin, onPress: function () {
                    _this.setState({ loginType: 1 });
                    rootLoading_1["default"].info('账号密码登录');
                } },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].passwordLoginText }, "\u8D26\u53F7\u5BC6\u7801\u767B\u5F55"))));
    };
    ForgetPassword.prototype.renderPasswordLogin = function () {
        var _this = this;
        var _a = this.state, passwordShow = _a.passwordShow, phone = _a.phone, password = _a.password;
        return (react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].accountLoginTitle }, "\u5BC6\u7801\u767B\u5F55"),
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].accountLoginConatiner },
                react_1["default"].createElement(react_native_1.TextInput, { underlineColorAndroid: "transparent", returnKeyType: "done", autoCorrect: false, autoCapitalize: "none", style: Login_style_1["default"].accountLoginInput, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u6216\u90AE\u7BB1", value: phone, onChangeText: function (value) {
                        _this.setState({ phone: value });
                    } })),
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].accountPasswordConatiner },
                react_1["default"].createElement(react_native_1.TextInput, { underlineColorAndroid: "transparent", returnKeyType: "done", autoCorrect: false, autoCapitalize: "none", secureTextEntry: !passwordShow, keyboardType: "ascii-capable", style: Login_style_1["default"].accountPasswordInput, placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: password, onChangeText: function (value) {
                        _this.setState({ password: value });
                    } }),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].passwordHideBtn, onPress: function () {
                        _this.setState({ passwordShow: !passwordShow });
                    } },
                    react_1["default"].createElement(react_native_1.Image, { style: Login_style_1["default"].passwordHideImg, source: require('../../assets/password_hide.png') }))),
            react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: [Login_style_1["default"].loginBtn, { marginTop: 108 }], onPress: function () {
                    rootLoading_1["default"].info('登录');
                } },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].loginText }, "\u767B\u5F55")),
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].forgetView },
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].passwordLogin, onPress: function () {
                        _this.setState({ loginType: 2 });
                        rootLoading_1["default"].info('验证码登录/注册');
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].passwordLoginText }, "\u9A8C\u8BC1\u7801\u767B\u5F55/\u6CE8\u518C")),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].passwordLogin, onPress: function () {
                        rootLoading_1["default"].info('忘记密码');
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].passwordLoginText }, "\u5FD8\u8BB0\u5BC6\u7801")))));
    };
    ForgetPassword.prototype.renderVerifyCodeLogin = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].verifyCodeLoginView },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].accountLoginTitle }, "\u624B\u673A\u53F7\u767B\u5F55/\u6CE8\u518C"),
                react_1["default"].createElement(LoginInputComponent_1["default"], { cellStyle: [Login_style_1["default"].oneClickLoginStyle, { marginTop: 31 }], title: "+86", inputProps: {
                        placeholder: '请输入您的手机号码',
                        onChangeText: function (value) {
                            _this.setState({ phone: value });
                        }
                    } }),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: [Login_style_1["default"].loginBtn, { marginTop: 44 }], onPress: function () {
                        rootLoading_1["default"].info('下一步');
                        _this.requestLogin();
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].loginText }, "\u4E0B\u4E00\u6B65")),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].passwordLogin, onPress: function () {
                        _this.setState({ loginType: 1 });
                        rootLoading_1["default"].info('账号密码登录');
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].passwordLoginText }, "\u8D26\u53F7\u5BC6\u7801\u767B\u5F55")))));
    };
    ForgetPassword.prototype.renderPrivicy = function () {
        var loginType = this.state.loginType;
        return (react_1["default"].createElement(react_native_1.View, null,
            loginType === 2 ? (react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].thirdLoginView },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].thirdLoginTitle }, "\u7B2C\u4E09\u65B9\u767B\u5F55"),
                react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].thirdLoginBtn },
                    react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                            rootLoading_1["default"].info('微信登录,敬请期待');
                        } },
                        react_1["default"].createElement(react_native_1.Image, { style: { width: 50, height: 50 }, source: require('../../assets/wx_logo.png') })),
                    react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                            rootLoading_1["default"].info('苹果登录,敬请期待');
                        } },
                        react_1["default"].createElement(react_native_1.Image, { style: { width: 50, height: 50 }, source: require('../../assets/apple_logo.png') }))))) : null,
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].privacyView },
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].privacyText }, loginType === 2 ? '阅读' : '进入即代表您已同意'),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                        rootLoading_1["default"].info('用户协议,敬请期待');
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].privacyDetail }, "\u300A\u7528\u6237\u534F\u8BAE\u300B")),
                react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].privacyText }, "\u53CA"),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                        rootLoading_1["default"].info('隐私政策,敬请期待');
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].privacyDetail }, "\u300A\u9690\u79C1\u653F\u7B56\u300B")))));
    };
    ForgetPassword.prototype.renderRegisterTipView = function () {
        var _this = this;
        var phone = this.state.phone;
        return (react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].registerTipView },
            react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].registerTipTitle }, "\u65B0\u624B\u673A\u53F7\u6CE8\u518C\u63D0\u9192\u624B\u673A\u53F7[" + phone + "]\u672A\u6CE8\u518C\uFF0C\u70B9\u51FB\u6CE8\u518C\uFF0C\u5C06\u4E3A\u60A8\u6CE8\u518C\u8D26\u53F7\u5E76\u8FDB\u5165\u8D81\u65E9\u627E\u3002"),
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].registerTipBtnView },
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: Login_style_1["default"].registerTipLeftBtn, onPress: function () {
                        _this.setState({ showRegisterTips: false });
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].accountTitle }, "\u6362\u8D26\u53F7\u767B\u5F55")),
                react_1["default"].createElement(GradientButton_1["default"], { containerStyle: Login_style_1["default"].registerTipRightBtn, text: "\u6CE8\u518C", onPress: function () {
                    } }))));
    };
    ForgetPassword.prototype.renderPrivacyView = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].privacyModal },
            react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].privacyModalTitle }, "\u8BF7\u9605\u8BFB\u5E76\u540C\u610F\u4EE5\u4E0B\u5185\u5BB9"),
            react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].privacyModalTitleView },
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                        _this.setState({ showPrivacyTips: false }, function () {
                            rootLoading_1["default"].info('用户协议,敬请期待');
                        });
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: [Login_style_1["default"].privacyDetail, { fontWeight: 'bold' }] }, "\u300A\u7528\u6237\u534F\u8BAE\u300B")),
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { onPress: function () {
                        _this.setState({ showPrivacyTips: false }, function () {
                            rootLoading_1["default"].info('隐私政策,敬请期待');
                        });
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: [Login_style_1["default"].privacyDetail, { fontWeight: 'bold' }] }, "\u300A\u9690\u79C1\u653F\u7B56\u300B"))),
            react_1["default"].createElement(react_native_1.View, { style: [Login_style_1["default"].registerTipBtnView, {
                        marginTop: 26
                    }] },
                react_1["default"].createElement(NextTouchableOpacity_1["default"], { style: [Login_style_1["default"].registerTipLeftBtn, { width: 110 }], onPress: function () {
                        _this.setState({ showPrivacyTips: false });
                    } },
                    react_1["default"].createElement(react_native_1.Text, { style: Login_style_1["default"].accountTitle }, "\u8FD4\u56DE")),
                react_1["default"].createElement(GradientButton_1["default"], { containerStyle: Login_style_1["default"].agreeBtn, text: "\u540C\u610F\u5E76\u7EE7\u7EED", onPress: function () {
                        _this.setState({ showPrivacyTips: false }, function () {
                            _this.setState({ showRegisterTips: true });
                        });
                    } }))));
    };
    ForgetPassword.prototype.render = function () {
        var _a = this.state, loginType = _a.loginType, showRegisterTips = _a.showRegisterTips, showPrivacyTips = _a.showPrivacyTips;
        return (react_1["default"].createElement(react_native_1.View, { style: Login_style_1["default"].container },
            react_1["default"].createElement(react_native_1.ScrollView, { keyboardShouldPersistTaps: "always", style: Login_style_1["default"].scrollview }, loginType === 0 ? (this.renderOneClickLogin()) : (loginType === 1 ? (this.renderPasswordLogin()) : (this.renderVerifyCodeLogin()))),
            this.renderPrivicy(),
            react_1["default"].createElement(WhiteContentModal_1["default"], { visible: showRegisterTips }, this.renderRegisterTipView()),
            react_1["default"].createElement(WhiteContentModal_1["default"], { visible: showPrivacyTips, modalStyle: {
                    height: 185,
                    width: system_1["default"].width,
                    bottom: system_1["default"].safeBottom
                }, contextStyle: {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    height: '100%',
                    marginHorizontal: 0,
                    overflow: 'hidden',
                    width: system_1["default"].width
                }, contextChildrenStyle: {
                    alignItems: 'baseline'
                } }, this.renderPrivacyView())));
    };
    return ForgetPassword;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        email: state.loginInfo.email,
        phone: state.loginInfo.phone,
        password: state.loginInfo.password,
        verifyCode: state.loginInfo.verifyCode,
        loginType: state.loginInfo.loginType
    };
};
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        reset_reducer: actions.reset_reducer,
        update_kv: actions.update_kv,
        loginMobile: actions.loginMobile
    }, dispatch);
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
