
module.exports = function lastModifiedPlugin(schema, options) {
  schema.methods.lazyPopulate = function (field) {
    const Prm = new Promise((resolve, reject) => {
      if (this.schema.obj[field] && this.schema.obj[field].ref) {
        const ModelName = this.schema.obj[field].ref;
        const Id = this[field];
        resolve(this.model(ModelName).findById(Id).exec());
      }
      else
        reject(`model does not have reference field ${field}, please check the Schema `);

    })
    return Prm;
  };
}
