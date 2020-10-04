// import { navigate } from 'gatsby'
// import { toast } from 'react-toastify'
const axios = require("axios")

// ـ

export const server = "http://localhost:3669";

export const url_base = 'http://digimaliat.ir'
// export const url_base = 'http://foroshman.ir'
// export const url_base = 'http://46.245.38.205'
// export const url_base = 'http://192.168.1.26'
// export const url_base = "http://185.94.97.170";
export const videoExtensions = ['mp4', 'avi', 'mkv']
export const textExtensions = ['txt', 'pdf', 'docx', 'xlsx']
export const audioExtensions = ['mp3']
export const imageExtensions = ['jpg', 'jpeg', 'png']

export async function apiCall(param) {
  // const user = store.get("user");
  const user = getOfflineToken();
  try {
    const response = await axios({
      method: param.method,
      url: server + '/api' + param.url,
      data: param.data,
      params: param.params,
      withCredentials: false,
      headers: {
        "Content-Type": param.formData ? 'multipart/form-data' : 'application/json',
        Authorization: !user ? null : "Token " + user.token
      },
      onUploadProgress: param.onUploadProgress ? param.onUploadProgress : ''
    });

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(response, param.url);
    }

    return response;
  } catch (ex) {
    console.log(ex.message);
    console.log(ex.response);
    if (
      ex.response &&
      (ex.response.status === 401 || ex.response.status === 403)
    ) {
      // if (param.url.indexOf('validToken') > -1) {
      localStorage.removeItem('user')
      // // // // // // navigate('/user/login')
      // }
      // } else
      //   history.push("/unauthorized");
      return null;
    }
    return ex.response;
  }
}

export function toPersianDigit(a) {
  if (a || a === 0 || a === '0') {
    if (typeof (a) === 'number')
      a = String(a)
    return a.replace(/\d+/g, function (digit) {
      var enDigitArr = [], peDigitArr = [];
      for (var i = 0; i < digit.length; i++) { enDigitArr.push(digit.charCodeAt(i)); }
      for (var j = 0; j < enDigitArr.length; j++) { peDigitArr.push(String.fromCharCode(enDigitArr[j] + ((!!a && a == true) ? 1584 : 1728))); }
      return peDigitArr.join('');
    })
  } else {
    return a
  }
};

export function toEnDigit(a) {
  var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str) {
      if (typeof str === 'string') {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    }
  return fixNumbers(a)
}

export function getExtension(s) {
  if (s) s = s.toLowerCase()
  if (s) {
    if (s.lastIndexOf('.') > -1) {
      return s.slice(s.lastIndexOf('.') + 1, s.length)
    } else return ''
  } else return ''
};

export function validateToken(force, noNavigate) {
  let user = getOfflineToken()
  if (user) {
    apiCall({
      url: '/validToken'
    }).then(res => {
      if (res && res.data && res.data.code === 0) {
        if (force)
          typeof window !== 'undefined' && window.location.replace(force)
      } else {
        !noNavigate && typeof window !== 'undefined' && window.location.replace('/user/login')
      }
    })
  } else {
    !noNavigate && typeof window !== 'undefined' && window.location.replace('/user/login')
    return false
  }
}

export function logout() {
  apiCall({
    url: '/user/userLogout'
  }).then(res => {
    typeof localStorage !== 'undefined' && localStorage.removeItem('user')
    setTimeout(window.location.href = '/user/login', 500)
  })
}

export const getOfflineToken = () => {
  let storage = typeof localStorage !== 'undefined' && localStorage.getItem('user')
  if (storage)
    return JSON.parse(typeof localStorage !== 'undefined' && localStorage.getItem('user'))
  return false
}

export const detectStatus = status => {
  switch (status) {
    case 0:
      return 'بسته شده'
    case 1:
      return 'منتظر پاسخ'
    case 2:
      return 'پاسخ داده شده'
    default:
      return ''
  }
}

export const detectMonth = month => {
  switch (month) {
    case 1:
      return 'فروردین'
    case 2:
      return 'اردیبهشت'
    case 3:
      return 'خرداد'
    case 4:
      return 'تیر'
    case 5:
      return 'مرداد'
    case 6:
      return 'شهریور'
    case 7:
      return 'مهر'
    case 8:
      return 'آبان'
    case 9:
      return 'آذر'
    case 10:
      return 'دی'
    case 11:
      return 'بهمن'
    case 12:
      return 'اسفند'
    default:
      return ''
  }
}

export const detectPriority = priority => {
  switch (priority) {
    case 0:
      return 'کم'
    case 1:
      return 'متوسط'
    case 2:
      return 'زیاد'
    default:
      return ''
  }
}

export const detectTodoStatus = status => {
  switch (status) {
    case 1:
      return 'منتظر'
    case 2:
      return 'انجام شده'
    case 3:
      return 'فراموش شده'
    default:
      return ''
  }
}

export const detectDifficulty = difficulty => {
  switch (difficulty) {
    case 1:
      return 'آسان'
    case 2:
      return 'متوسط'
    case 3:
      return 'سخت'
    default:
      return ''
  }
}

export const detectExamStatus = (percent, pass_percent) => percent >= pass_percent

export const detectHintName = id => {
  switch (id) {
    case 1:
      return 'کتابخانه'
    case 2:
      return 'آزمون'
    case 3:
      return 'درخواست ها'
    case 4:
      return 'فروشگاه'
    case 5:
      return 'اتاق گفتگو'
    case 6:
      return 'فایل ها'
    case 7:
      return 'پرسش و پاسخ'
    case 8:
      return 'کتابخانه من'
    case 9:
      return 'اخبار'
    case 10:
      return 'یادداشت ها'
    case 11:
      return 'تقویم مالیاتی'
    case 12:
      return 'اظهارنظر فنی'
    case 13:
      return 'گنجینه'
    case 14:
      return 'لایحه'
    case 15:
      return 'ثبت نام'
    case 16:
      return 'بخشنامه'
    default:
      return ''
  }
}

export function makePrint(text, characterCount) {
  let pageNo = Math.ceil(text.length / characterCount);
  let container = document.createElement("div");
  for (let i = 0; i < pageNo; i++) {
    let div = document.createElement("div");
    let divText = document.createTextNode(text.substring(i * characterCount, (i + 1) * characterCount));

    div.appendChild(divText);
    div.id = 'page';
    let p = document.createElement("p");
    p.setAttribute("class", "page-counter")
    let pText = document.createTextNode(`صفحه ${toPersianDigit(i + 1)} از ${toPersianDigit(pageNo)}`);
    p.appendChild(pText);
    div.appendChild(p);
    container.appendChild(div);
  }
  return container
  // document.getElementById('body').appendChild(container);
}

export function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}

export function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

export function getOSId() {
  const oss = ['Linux', 'Windows', 'Mac OS', 'iOS', 'Android'];
  const os = getOS();
  if (os) {
    const id = oss.indexOf(os);
    if (id > -1) return id + 1;
    else return null
  }
  else return null;
}

export function getPlatform() {
  var platform = null;
  const userAgent = window.navigator.userAgent;

  if (/Android/.test(userAgent)) {
    platform = 'android';
  }
  else if (/iPhone/.test(userAgent) || /iPad/.test(userAgent) || /iPod/.test(userAgent)) {
    platform = 'ios';
  }
  else if (/Linux/.test(userAgent)) {
    platform = 'linux';
  }
  else {
    platform = 'windows';
  }

  return platform;
}

export function getBrowser() {
  var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: (tem[1] || '') };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null)
    M.splice(1, 1, tem[1]);
  return { name: M[0], version: M[1] };
}

export function getBrowserInfo() {
  const browsers = ['Chrome', 'Opera', 'Firefox', 'Edge', 'Safari'];
  const browser = getBrowser();
  if (browser) {
    const id = browsers.indexOf(browser.name);
    if (id > -1) return { id: id + 1, version: browser.version };
    else return null;
  }
  else return null;
}

export function getUnique() {
  let unique = typeof localStorage !== 'undefined' && localStorage.getItem('unique')

  if (!unique) {
    unique = new Date().getTime()
    typeof localStorage !== 'undefined' && localStorage.setItem('unique', unique)
  }

  return unique
}

export async function appStat() {
  console.log(getUnique());
  console.log(getOSId())
  console.log(getBrowserInfo())
  const browser = getBrowserInfo();
  const _os_id = getOSId();
  const res = await apiCall({
    method: 'post',
    url: '/adminPanel/statistics',
    data: {
      u_id: getUnique(),
      platform_id: 1,// 1:web 2:android 3:ios
      version: browser ? browser.version : null,
      browser_id: browser ? browser.id : null,
      _os_id
    }
  })
}

export function highlightWords(text, q) {
  if (text && q) {
    text = text.toString()
    const pattern = new RegExp("(" + q + ")", "gi")
    return text.replace(pattern, "<span class='bg-tomato-lighter'>" + q + "</span>")
  } else return text
}

export function showNChar(s, n = 32, dots) {
  let cut = s?.slice(0, n)
  if (s.length > n) cut = cut + (dots ? '...' : '')
  return cut
}

export function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

export function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
