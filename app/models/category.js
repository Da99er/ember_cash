import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    name: attr('string'),
    top:attr('boolean'),
    money: hasMany('money'),
    childcat: hasMany('category', { inverse: 'parentcat' }),
    parentcat: belongsTo('category', { inverse: 'childcat' })
});
