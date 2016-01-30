export default class Utils {

  // Extends target to include all properties in a list of other objects
  static extend (target, ...objects) {
    for (var i = 0, object; i < objects.length; i++) {
      object = objects[i]
      for (var key in object) {
        var value = object[key]
        target[key] = value
      }
    }
    return
  }
}
