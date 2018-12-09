/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Peter Flannery. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const FEED_URL = 'https://api-v2v3search-0.nuget.org/autocomplete';

export function nugetGetPackageVersions(packageName) {
  const httpRequest = require('request-light');
  const queryUrl = `${FEED_URL}?id=${packageName}&prerelease=true&semVerLevel=2.0.0`;

  return httpRequest.xhr({ url: queryUrl })
    .then(response => {
      if (response.status != 200) {
        return Promise.reject({
          status: response.status,
          responseText: response.responseText
        });
      }

      const pkg = JSON.parse(response.responseText);
      return pkg.totalHits == 0
        ? Promise.reject({ status: 404 })
        : pkg.data.reverse();
    })

}
