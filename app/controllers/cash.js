import Ember from 'ember';

export default Ember.Controller.extend({
    appName: "cash library",
    appError: "",
    actions: {
        addTopCat: function(subname) {
            console.log(subname,this.get('model'));

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
            this.set("appError", "ERROR->" + errorText);
        }
    }
});