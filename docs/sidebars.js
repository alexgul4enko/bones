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
    'resources/resources',
    'resources/resource_problem',
    'resources/connect_resource_type',
    'resources/connect_resources',
    'resources/resource_customresources',
    'resources/resource_rewrite',
    'resources/resource_ts',
    {
        Hooks: [
            'resources/hooks/use-resource',
            'resources/hooks/use-resource-usage',
            'resources/hooks/use-prefetch-resource',
            'resources/hooks/use-custom-request',
            'resources/hooks/use-prefetch-request',
            'resources/hooks/use-request',
            'resources/hooks/use-clear',
            'resources/hooks/use-search',
            'resources/hooks/resources-actions',
            'resources/hooks/use-resource-data'
        ]
    },
    {
        HOCS: [
            'resources/resource_prefetchResources',
            'resources/resource_withFinalForm',
            'resources/resource_withInfinityList'
        ]
    },
    {
        GraphQL: ['resources/graphql/usequery', 'resources/graphql/usePrefetchQuery']
    },
    'resources/resources_cache'
  ],
  cacheSitebar: [
    'cache/cache_about'
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
    'i18n/i18n_crowdin'
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
