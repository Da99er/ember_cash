import Ember from 'ember';

export default Ember.Controller.extend({
    appName: "cash library",
    appError: "",
    //this.set("model.nowData","01-01-2016"),
    //nowData:"01-01-2016",
    //startData:"06-01-2016",
    //endData:"16-01-2016",
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