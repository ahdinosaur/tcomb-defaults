# tcomb-defaults

default properties in tcomb structs

```shell
npm install --save tcomb-defaults
```

## usage

### `tcombDefaults = require('tcomb-defaults')`

### `Type = tcomb.struct({ ... })`

### `DefaultType = tcombDefaults(Type, defaultProps)`

- `Type` is a [tcomb stuct](https://github.com/gcanti/tcomb/blob/master/docs/API.md#the-struct-combinator)
- `defaultProps` is an object with defaults for when a key in the struct is Nil

## example

see [test](./test.js)

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
