// modified from https://github.com/cacheflowe/haxademic.js/blob/master/src/url-util.es6.js
class URLUtil {
  static getHashQueryParam(variable) {
    const url = new URL(document.location);
    const hashString = url.hash.slice(1); // remove the '#'
    const searchParams = new URLSearchParams(hashString);
    for (let [key, value] of searchParams) {
      if (key == variable) return value;
    }
    return null;
  }

  static curAbsolutePath() {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  }

  static removeHash() {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  static reloadOnHashChange() {
    window.addEventListener("popstate", () => document.location.reload());
  }

  static setHashChangeListener(callback) {
    window.addEventListener("popstate", callback);
  }
}

export default URLUtil;