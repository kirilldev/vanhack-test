/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Read from './Read';

const title = 'Log In';

function action(router) {
  const postId = router.query.post;

  if (!postId) {
    throw new Error(''); // TODO: redirect to forum
  }

  return {
    chunks: ['read'],
    title,
    component: (
      <Layout title="View Post">
        <Read postId={postId} />
      </Layout>
    ),
  };
}

export default action;
