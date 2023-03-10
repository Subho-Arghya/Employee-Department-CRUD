import store from "./storage.js";

export default class BaseImplementation {

    //
    //  let collection = [];
    // let key_main='';

    constructor(key) {
        //get it from session
        this.key_main = key;
        let collection_temp = localStorage.getItem(key);
        this.collection = collection_temp != null ? JSON.parse(collection_temp) : [];
    }

    /**
     * This function will be used to add data to session/local
     * @param {*} model  Model that needs to be added
     */
    Add(model) {
        let maxnum = this.arrayMax(this.collection);
        let new_id = maxnum + 1;
        model['id'] = new_id;
        this.collection.push(model);
        this.UpdateStore(this.collection);
    }

    Update(id, model) {
        console.log("id in baseImp is : " + id);
        let index = this.collection.findIndex((emp) => emp.id == id);
        this.collection[index] = model;
        this.UpdateStore(this.collection);
    }

    Delete(id) {
        let index = this.collection.findIndex((emp) => emp.id == id);
        this.collection.splice(index, 1);
        store.set(this.key_main, this.collection);
        alert(`You sure? (id : ${id})`);
    }

    arrayMax(arr) {
        if (arr.length == 0) {
            return 0;
        } else {
            let max_id = arr[0].id;
            arr.forEach(element => {
                if (element.id > max_id) max_id = element.id;
            });
            return max_id;
        }
    }

    UpdateStore(arr) {
        //let session_storage = 
        localStorage.setItem(this.key_main, JSON.stringify(arr));
    }

}