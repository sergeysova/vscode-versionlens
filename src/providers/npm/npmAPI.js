/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Peter Flannery. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as npm from 'npm';

export function npmViewVersion(packageName) {
  return new Promise((resolve, reject) => {
    npm.load(loadError => {
      if (loadError) {
        reject(loadError);
        return;
      }

      npm.view(packageName, 'version', (viewError, response) => {
        if (viewError) {
          reject(viewError);
          return;
        }

        // get the keys from the object returned
        let keys = Object.keys(response);

        // take the last and most recent version key
        let lastKey = keys.length > 0 ? keys[keys.length - 1] : '';

        resolve(lastKey);
      });
    });
  });
}

export function npmViewDistTags(packageName) {
  return new Promise((resolve, reject) => {
    npm.load(loadError => {
      if (loadError) {
        reject(loadError);
        return;
      }

      npm.view(packageName, 'dist-tags', (viewError, response) => {
        if (viewError) {
          reject(viewError);
          return;
        }

        // get the keys from the object returned
        let keys = Object.keys(response);

        // take the first key and return the dist-tags keys
        let tags
        if (keys.length > 0) {
          const distTags = response[keys[0]]['dist-tags'];
          tags = Object.keys(distTags)
            .map(key => ({ name: key, version: distTags[key] }));
        } else {
          tags = [
            { "latest": "latest" }
          ];
        }

        resolve(tags);
      });
    });
  });
}