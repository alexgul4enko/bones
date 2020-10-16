/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  skeltonSitebar: [
    'skeleton/skeleton_about',
    // 'skeleton/skeleton_instalation',
    // 'skeleton/webpack',
    'skeleton/skeleton_architecture',
    'skeleton/skeleton_forms',
    // 'skeleton/skeleton_access',
    // 'skeleton/skeleton_routing',
  ],
  resourcesSitebar: [
    'resources/resource_problem',
    'resources/resource_instalation',
    'resources/connect_resources',
    'resources/resource_customresources',
    {
      HOCS: [
        'resources/resource_prefetchResources',
        'resources/resource_withFinalForm',
        'resources/resource_withInfinityList',
        'resources/resource_navigationToProps',
      ],
    },
    'resources/resource_hooks',
  ],
  cacheSitebar: [
    'cache/cache_about',
    'cache/cache_middleware',
    'cache/cache_reducer',
  ],
  queryParamsSitebar: [
    'queryParams/queryParams_about',
  ],
  apiSitebar: [
    'api/api_about',
    'api/api_instance',
    'api/api_interceptors',
    'api/api_requests',
    'api/api_terminate',
  ],
  i18nSitebar: [
    'i18n/i18n_about',
  ],
  accessSitebar: [
    'access/access_about',
  ],
  router: [
    'router/router_about',
    'router/router_configs',
    'router/router_components',
    'router/router_with_router',
    'router/router_config',
  ],
}
