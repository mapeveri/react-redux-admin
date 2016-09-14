import $ from 'jquery';

import { modelsUsers } from './models/users/users';
import { modelsPosts } from './models/blog/posts';

const models = $.extend(modelsUsers, modelsPosts);
export default models;
