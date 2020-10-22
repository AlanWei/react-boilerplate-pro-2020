import pathToRegexp from 'path-to-regexp';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';

const formatMenuPath = (data, parentPath = '/') =>
  map(data, (item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatMenuPath(
        item.children,
        `${parentPath}${item.path}/`,
      );
    }
    return result;
  });

const urlToList = (url) => {
  if (url) {
    const urlList = url.split('/').filter((i) => i);
    return map(
      urlList,
      (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`,
    );
  }
  return [];
};

const getFlatMenuKeys = (menuData) =>
  reduce(
    menuData,
    (keys, item) => {
      keys.push(item.path);
      if (item.children) {
        return keys.concat(getFlatMenuKeys(item.children));
      }
      return keys;
    },
    [],
  );

const getMeunMatchKeys = (flatMenuKeys, paths) =>
  reduce(
    paths,
    (matchKeys, path) =>
      matchKeys.concat(
        filter(flatMenuKeys, (item) => pathToRegexp(item).test(path)),
      ),
    [],
  );

const formatSelectedKeys = (fullPathMenu, pathname) =>
  getMeunMatchKeys(getFlatMenuKeys(fullPathMenu), urlToList(pathname));

export { formatMenuPath, formatSelectedKeys };
