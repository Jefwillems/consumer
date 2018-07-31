export const Data = {
  init(data) {
    Data.data = data;
  },
  paths() {
    const ret = [];
    const paths = Data.data.paths;
    const pathKeys = Object.keys(paths);
    pathKeys.forEach(pathKey => {
      const path = paths[pathKey];
      const methodKeys = Object.keys(path);
      ret.push(
        ...methodKeys.map(key => {
          return {
            method: key.toUpperCase(),
            url: parseUrl(pathKey),
            description: path[key].description,
            operationId: path[key].operationId,
            produces: path[key].produces,
            parameters: path[key].parameters,
            responsen: path[key].responses,
          };
        })
      );
    });
    return ret;
  },
  baseUrl() {
    return Data.data.host + Data.data.basePath;
  },
};

const parseUrl = url => {
  const u = url.indexOf('{');
  if (u > -1) {
    url = url.split('{').join('${');
  }
  return url;
};
