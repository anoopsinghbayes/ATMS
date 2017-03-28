
module.exports = function lastModifiedPlugin(schema, options) {
  schema.methods.lazyPopulate = function (field) {
    let ModelName = undefined;
    for (var property in this.schema.obj) {
      if (this.schema.obj.hasOwnProperty(property)  && property  == field && this.schema.obj[property].ref) {
        ModelName = this.schema.obj[property].ref;
      }
    }
    if (!ModelName)
      throw `model does not have ref filed ${field} please check the Schema`;

    var Id = this[field];
    return this.model(ModelName).findById(Id).exec();
  };
}
