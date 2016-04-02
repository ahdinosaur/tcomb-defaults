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
