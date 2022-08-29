import moment from "moment";
import { camelCase, isObject, snakeCase } from "lodash";
import i18next from "i18next";

const t = i18next.getFixedT();

const AppUtil = {
  toCamelCaseKey(obj) {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toCamelCaseKey(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: AppUtil.toCamelCaseKey(obj[key]),
        }),
        {}
      );
    }
    return obj;
  },
  toSnakeCaseKey(obj) {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toSnakeCaseKey(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key]),
        }),
        {}
      );
    }
    return obj;
  },
  getBrowserLanguage() {
    const language =
      (navigator.languages && navigator.languages[0]) || // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10

    if (language.indexOf("-") !== -1) {
      return language.split("-")[0];
    }
    return language;
  },
  getExtension(path) {
    const basename = path.split(/[\\/]/).pop();
    const pos = basename.lastIndexOf(".");
    if (basename === "" || pos < 1) {
      return "";
    }
    return basename.slice(pos + 1);
  },
  CurrencyFormatted(amount) {
    let i = parseFloat(amount);
    if (isNaN(i)) {
      i = 0.0;
    }
    let minus = "";
    if (i < 0) {
      minus = "-";
    }
    i = Math.abs(i);
    i = parseInt((i + 0.005) * 100);
    i = i / 100;
    let s = String(i);
    if (s.indexOf(".") < 0) {
      s += ".00";
    }
    if (s.indexOf(".") === s.length - 2) {
      s += "0";
    }
    s = minus + s;
    return s;
  },
  CommaFormatted(amount) {
    let delimiter = ","; // replace comma if desired
    let a = amount.split(".", 2);
    let d = a[1];
    let i = parseInt(a[0]);
    if (isNaN(i)) {
      return "";
    }
    let minus = "";
    if (i < 0) {
      minus = "-";
    }
    i = Math.abs(i);
    let n = String(i);
    a = [];
    while (n.length > 3) {
      let nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = n + "." + d;
    }
    amount = minus + amount;
    return amount;
  },
  formatNumber(amount) {
    return AppUtil.CommaFormatted(AppUtil.CurrencyFormatted(amount));
  },
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  },
  getUrl(path = "/") {
    let url;
    const pathname = window.location.pathname;
    const protocol = window.location.protocol;
    const hash = window.location.hash ? "#" : "";
    const host = window.location.hostname;
    const port = window.location.port;
    if (port) {
      url = protocol + "//" + host + ":" + port + pathname + hash + path;
    } else {
      url = protocol + "//" + host + pathname + hash + path;
    }
    return url;
  },
  copyLinkBuyer(path = "/") {
    let url;
    const protocol = window.location.protocol;
    const hash = window.location.hash ? "#" : "";
    const host = window.location.hostname;
    const port = window.location.port;
    if (port) {
      url = protocol + "//" + host + ":" + port + hash + path;
    } else {
      url = protocol + "//" + host + hash + path;
    }
    return url;
  },
  blobCreationFromURL(inputURI) {
    let binaryVal;

    // mime extension extraction
    const inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(",")[0].indexOf("base64") >= 0)
      binaryVal = atob(inputURI.split(",")[1]);
    // Decoding of base64 encoded string
    else binaryVal = unescape(inputURI.split(",")[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    const blobArray = [];
    for (let index = 0; index < binaryVal.length; index++) {
      blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
      type: inputMIME,
    });
  },
  scrollToTopById(id) {
    if (!id) return;
    const mainPanel = document.getElementById(id);
    if (!mainPanel) return;
    if (AppUtil.detectBrowser() === "Firefox") {
      mainPanel.scrollTop = 0;
    } else {
      mainPanel.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  },
  detectBrowser() {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) !== -1
    ) {
      return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      return "Firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      !!document.documentMode === true
    ) {
      return "IE"; //crap
    } else {
      return "Unknown";
    }
  },
  makeBrand(routes = []) {
    let name = "Care Aid";
    routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        name = t(prop.extraTitle ? prop.extraTitle : prop.name);
      }
      return null;
    });
    return name;
  },
};

export default AppUtil;
