export enum ELanguageEnum {
    /**
     * 繁体
     */
    ZHHANT,
    /**
     * 英文
     */
    EN,
}

class Localization {
    private static language: ELanguageEnum = ELanguageEnum.ZHHANT
    private static hashMap: { [key: string]: string } = require('./zhHant.json')

    /**
     * 设置语言
     * @param language 语言
     */
    public static setLanguage(language: ELanguageEnum) {
        if (this.language === language) {
            return
        }
        this.language = language
        switch (this.language) {
            case ELanguageEnum.ZHHANT:
                this.hashMap = require('./zhHant.json')
                break
            case ELanguageEnum.EN:
                this.hashMap = require('./en.json')
                break
            default:
                this.hashMap = require('./en.json')
                break
        }
    }

    public static isChinese() {
        return this.language === ELanguageEnum.ZHHANT
    }

    public static localLanguage() {
        return this.language === ELanguageEnum.ZHHANT ? 'cn' : 'en'
    }

    /**
     * 国际化
     * @param key key
     */
    public static get(key: string): string {
        return this.hashMap[key] || ''
    }
}

export default Localization
