import Ember from 'ember';

export default Ember.Controller.extend({
    appName: "cash",
    dateStore: Ember.inject.service(),
    appError: "",
    store: Ember.inject.service(),
    actions: {
        addTopCat: function(subname) {
            //search duplicate item in model
            var isDuplicateName = this.get('model').getEach('name').some(function(e) {
                //console.log(e);
                if (e === subname) {
                    return true;
                }
            });

            //item for save
            var categoryObj = {
                name: subname,
                top: true
            };

            //catch errors
            if (!subname) {
                this.send("showError", "Please add some text to input");
            } else if (isDuplicateName) {
                this.send("showError", "Please use original name");
            } else {
                var category = this.store.createRecord('category', categoryObj);
                category.save();
            }


        },
        showError: function(errorText) {
            var modelThis = this;
            modelThis.set("appError", "ERROR->" + errorText);

            if (!modelThis.get("errorStatus")) {
                modelThis.set("errorStatus", true);
                setTimeout(function() {
                    modelThis.set("appError", "");
                    modelThis.set("errorStatus", false);
                }, 2000);
            }
        }
    }
});
