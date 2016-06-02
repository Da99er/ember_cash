import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    createData: attr('string'),
    price:attr("number"),
    category: belongsTo('category')
});
