import Cookies from 'js-cookie';
const isEN = Cookies.get("lang") === 'en';

const local = {
    // 路由相关 rouete.js
    home: isEN ? 'home' : '首页',
    qualification: isEN ? 'qualification' : '资质',
    'qualification-promoted': isEN ? 'qualification-promoted' : '资质审核',
    'qualification-creative': isEN ? 'qualification-creative' : '素材审核'
};

export default function getLastTranslation(key){
    return local[key]
}