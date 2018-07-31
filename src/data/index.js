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

      const u = pathKey.indexOf('{');
      if (u > -1) {
        pathKey = pathKey.split('{').join('${');
      }
      ret.push(
        ...methodKeys.map(key => {
          return {
            method: key.toUpperCase(),
            url: pathKey,
            description: path[key].description,
            operationId: path[key].operationId,
            produces: path[key].produces,
            parameters: path[key].parameters,
            pathParams: this._resolvePathParams(path[key].parameters),
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
  _resolvePathParams(params) {
    const pathParams = params.filter(p => p.in === 'path').map(p => p.name);
    if (pathParams.length === 0) {
      return undefined;
    }
    return ', ' + pathParams.join(', ');
  },
};
