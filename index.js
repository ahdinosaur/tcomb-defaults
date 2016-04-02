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
        var defaultProp = typeof setDefault === 'function' ?
          setDefault.call(sofar) : setDefault
        return Type.update(sofar, {
          [next]: { $set: defaultProp }
        })
      }
      return sofar
    }, props)
  }
}
