import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    store: Ember.inject.service(),
    money: 0,
    init() {
        this._super(...arguments);
        this.catError = "";
        this.parentCategoryId = this.attrs.parentCategoryId.value;
        console.log("init id", this.parentCategoryId);
        this.parentCategory = this.get('store').peekRecord("category", this.get("parentCategoryId"));
    },
    didUpdateAttrs() {
        this._super(...arguments);
        this.set("catError", "");
        this.set("parentCategoryId", this.attrs.parentCategoryId.value);
        this.parentCategory = this.get('store').peekRecord('category', this.get("parentCategoryId"));
        console.log("rerender name -->", this.get("parentCategory").get("name"));
    },
    didRender() {
        console.log("after");
    },
    actions: {
        addSubCategory: function(newCategoryName) {
            console.log("name", this.get('store').peekRecord('category', this.get("parentCategoryId")).get('name'));

            var isDuplicateName = this.get("parentCategory").get("childcat").getEach('name').some(function(e) {
                
                if (e === newCategoryName) {
                    return true;
                }

            });

            var newSubCategory = {
                name: newCategoryName,
                top: false,
                parentcat: this.get("parentCategory")
            };

            if (!isDuplicateName) {
                var newSubCategoryElement = this.get('store').createRecord('category', newSubCategory);
                newSubCategoryElement.save();
                this.get("parentCategory").save();
            } else {
                this.send("showError", "you have duplicate");
            }
        },
        removeCategoty: function(DeletedCategoryId) {
            var modelThis = this;
            var DeletedCategory = modelThis.get('store').peekRecord('category', DeletedCategoryId);

            if (!DeletedCategory.get('top')) {
                var parentCategoryId = DeletedCategory.get("parentcat").get("id");
                var parentCategory = modelThis.get('store').peekRecord('category', parentCategoryId);
                parentCategory.get('childcat').removeObject(DeletedCategory);
                parentCategory.save();
            }

            function recursiveEraseRelationship(id) {
                
                if (id) {
                    var DeletedCategory = modelThis.get('store').peekRecord('category', id);
                    if (DeletedCategory.get("childcat").get("length")) {
                        DeletedCategory.get("childcat").forEach((el) => {
                            recursiveEraseRelationship(el.get('id'));

                        });
                    }
                    console.log("deleted", DeletedCategory.get('name'));
                    DeletedCategory.deleteRecord();
                    DeletedCategory.save();
                }

            }
 
            recursiveEraseRelationship(DeletedCategoryId);
        },
        addMoney: function(money, categoryId) {
            var modelThis = this;
            console.log(modelThis.get("store").get("nowData"));
            console.log("money", money, categoryId);

            if (money) {
                var category = this.get('store').peekRecord('category', categoryId);
                


            } else {
                this.send("showError", "please input some number");
            }




        },
        showError: function(errorText) {
            var modelThis = this;
            modelThis.set("catError", "ERROR->" + errorText);

            if (!modelThis.get("errorStatus")) {
                modelThis.set("errorStatus", true);
                setTimeout(function() {
                    modelThis.set("catError", "");
                    modelThis.set("errorStatus", false);
                }, 2000);
            }

        }
    }
});

/*
    name: attr('string'),
    top:attr('boolean'),
    money: hasMany('money'),
    childcat: hasMany('category', { inverse: 'parentcat' }),
    parentcat: belongsTo('category', { inverse: 'childcat' })
*/
