const test = require('tape')
const Tc = require('tcomb')

const tcombDefaults = require('./')

test('tcomb-defaults', function(t) {
  t.ok(tcombDefaults, 'module is require-able')
  const Type = Tc.struct({
    min: Tc.maybe(Tc.Number),
    max: Tc.maybe(Tc.Number)
  }, 'Range')
  const DefaultType = tcombDefaults(Type, {
    min: 0,
    max: 100
  })
  t.equal(Type.meta, DefaultType.meta)
  const first = DefaultType({})
  t.equal(first.min, 0)
  t.equal(first.max, 100)
  t.ok(Type.is(first))
  t.ok(DefaultType.is(first))
  const second = DefaultType({
    min: -1,
    max: 1
  })
  t.equal(second.min, -1)
  t.equal(second.max, 1)
  t.ok(Type.is(second))
  t.ok(DefaultType.is(second))
  t.end()
})

test('dynamic defaults', function (t) {
  const Ndarray = Tc.struct({
    data: Tc.maybe(Tc.list(Tc.Number)),
    shape: Tc.maybe(Tc.list(Tc.Number))
  })
  const DefaultNdarray = tcombDefaults(Ndarray, {
    shape: function () {
      return [this.data.length]
    }
  })
  const arr = DefaultNdarray({
    data: [0, 1, 2, 3]
  })
  t.deepEqual(arr.data, [0, 1, 2, 3])
  t.deepEqual(arr.shape, [4])
  t.ok(Ndarray.is(arr))
  t.ok(DefaultNdarray.is(arr))
  t.end()
})
