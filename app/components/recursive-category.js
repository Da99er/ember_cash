import Ember from 'ember';

//will erase all relationships and delete self and child category
function recursiveEraseRelationship(id, modelThis) {

    if (id) {
        var DeletedCategory = modelThis.get('store').peekRecord('category', id);

        if (DeletedCategory.get("childcat.length")) {
            DeletedCategory.get("childcat").forEach((el) => {
                recursiveEraseRelationship(el.get('id'),modelThis);
            });
        }

        console.log("deleted", DeletedCategory.get('name'));
        DeletedCategory.deleteRecord();
        DeletedCategory.save();
    }

}

//add this money in hierarchy of categorues from this category to first parent
function recursiveAddMoney(category, money) {
    category.get("money").pushObject(money);

    if (!category.get("top")) {
        category.get("parentcat").then(function(el) {
            recursiveAddMoney(el, money);
        });
    }

    category.save();
    money.save();
}

//remove all money in hierarchy of categorues from this category to first parent
function recursiveRemoveMoney(category, money) {
    console.log("recursiveRemoveMoney",category.get("name"));
    category.get("money").removeObjects(money);
    if (!category.get("top")) {
        category.get("parentcat").then((el) => {
            recursiveRemoveMoney(el, money);
        });
    }

    category.save();
}



export default Ember.Component.extend({
    tagName: 'li',
    store: Ember.inject.service(),
    dateStore: Ember.inject.service(),
    init() {
        this._super(...arguments);
        this.catError = "";
        this.сategoryId = this.attrs.сategoryId.value;
        this.category = this.get('store').peekRecord("category", this.get("сategoryId"));
        console.log("init id", this.category.get("id"));
    },
    didUpdateAttrs() {
        this._super(...arguments);
        this.set("catError", "");
        this.set("сategoryId", this.attrs.сategoryId.value);
        this.set("сategory", this.get("store").peekRecord("category", this.get("сategoryId")));
        console.log("rerender name -->", this.get("сategory").get("name"));
    },
    didRender() {
        //console.log("after",this.get("category.id"));

    },
    actions: {
        addSubCategory: function(newCategoryName) {

            if (!newCategoryName) {
                this.send("showError", "please type some name");
            } else {
                var isDuplicateName = this.get("category.childcat").getEach("name").some(function(e) {

                    if (e === newCategoryName) {
                        return true;
                    }

                });

                var newSubCategory = {
                    name: newCategoryName,
                    top: false,
                    parentcat: this.get("category")
                };

                if (!isDuplicateName) {
                    var newSubCategoryElement = this.get("store").createRecord("category", newSubCategory);
                    newSubCategoryElement.save();
                    this.get("category").save();
                } else {
                    this.send("showError", "you have duplicate");
                }
            }


        },
        removeCategoty: function() {
            var modelThis = this;
            var DeletedCategory = this.get('store').peekRecord('category', this.get('сategoryId'));

            if (!DeletedCategory.get('top')) {
                var parentCategoryId = DeletedCategory.get("parentcat").get("id");
                var parentCategory = this.get('store').peekRecord('category', parentCategoryId);
                recursiveRemoveMoney(parentCategory, DeletedCategory.get("money").toArray());
                parentCategory.get('childcat').removeObject(DeletedCategory);
                parentCategory.save();
            }

            recursiveEraseRelationship(modelThis.get('сategoryId'), modelThis);
        },
        addMoney: function(money) {

            if (money) {
                var category = this.get('store').peekRecord('category', this.get('сategoryId'));
                var moneyObj = {
                    createDate: this.get("dateStore.nowDate"),
                    price: money
                };
                var newMoney = this.get('store').createRecord("money", moneyObj);
                newMoney.get('category').pushObject(category);
                if (!category.get("top")) {
                    category.get("parentcat").then(function(el) {
                        recursiveAddMoney(el, newMoney);
                    });

                }
                newMoney.save();
                category.save();

            } else {
                this.send("showError", "please input some number");
            }

        },
        showError: function(errorText) {
            var modelThis = this;
            modelThis.set("catError", "ERROR->" + errorText);

            if (!this.get("errorStatus")) {
                this.set("errorStatus", true);
                setTimeout(function() {
                    modelThis.set("catError", "");
                    modelThis.set("errorStatus", false);
                }, 2000);
            }

        }
    }
});