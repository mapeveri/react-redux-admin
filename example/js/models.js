import $ from 'jquery';

import { modelsUsers } from './models/users/models';
import { modelsPosts } from './models/blog/models';

const models = $.extend(modelsUsers, modelsPosts);
export default models;
