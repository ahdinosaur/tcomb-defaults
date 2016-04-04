var Tc = require('tcomb')

module.exports = defaults

function defaults (Type, defaults) {
  var DefaultType = Tc.func(Type, Type)
  .of(setDefaults(Type, defaults))

  Tc.mixin(DefaultType, Type, true)
  DefaultType.defaults = defaults

  DefaultType.prototype = Object.create(Type.prototype)

  return DefaultType
}

function setDefaults (Type, defaults) {
  return function (props) {
    return Object.keys(props)
    .reduce(function (sofar, next) {
      var setDefault = defaults[next]
      if (
        Tc.Nil.is(sofar[next]) &&
        !Tc.Nil.is(setDefault)
      ) {
        var defaultProp = Tc.Function.is(setDefault) ?
          setDefault.call(sofar) : setDefault

        var patch = {}
        patch[next] = { $set: defaultProp }

        return Type.update(sofar, patch)
      }
      return sofar
    }, props)
  }
}
