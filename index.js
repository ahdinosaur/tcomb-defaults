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
      if (
        Tc.Nil.is(sofar[next]) &&
        !Tc.Nil.is(defaultProps[next])
      ) {
        return Type.update(sofar, {
          [next]: { $set: defaultProps[next] }
        })
      }
      return sofar
    }, props)
  }
}
