var Tc = require('tcomb')

module.exports = defaults

function defaults (Type, defaultProps) {
  var DefaultType = Tc.func(Type, Type)
  .of(setDefaults(Type, defaultProps))

  DefaultType.is = Type.is
  DefaultType.meta = Type.meta

  return DefaultType
}

function setDefaults (Type, defaultProps) {
  return function (props) {
    return Object.keys(props)
    .reduce(function (sofar, next) {
      var setDefault = defaultProps[next]
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
