#hof-behaviour-hooks

HOF Behaviour enabling lifecycle hooks for extending functionality in main form pipeline.

##Usage

###With [mixwith.js](https://github.com/justinfagnani/mixwith.js)

```js
const mix = require('mixwith').mix;
const Hooks = require('hof-behaviour-hooks');
const BaseController = require('hof-form-controller');

class MyController extends mix(BaseController).with(Hooks) {
  ...
}
```
`MyController` now extends `hof-form-controller` and has `hof-behaviour-hooks` functionality mixed in.

##Functionality

The following hooks are currently supported, the methods are GET/POST pipeline methods from `hof-form-controller`:

####GET
* `_getErrors` - `'pre-getErrors', 'post-getErrors'`
* `_getValues` - `'pre-getValues', 'post-getValues'`
* `_locals` - `'pre-locals', 'post-locals'`
* `render` - `'pre-render', 'post-render'`

####POST
* `_process` - `'pre-process', 'post-process'`
* `_validate` - `'pre-validate', 'post-validate'`
* `saveValues` - `'pre-saveValues', 'post-saveValues'`
* `successHandler` - `'pre-successHandler', 'post-successHandler'`

###In field config

fields.js
```js
module.exports = {
  'field-1': {
    hooks: {
      'post-locals': (req, res, next) => {
        Object.assign(res.locals, {
          foo: 'bar'
        });
        next();
      },
      'pre-process': (req, res, next) => {
        req.body['field-1'] = req.body['field-1'].toUpperCase();
        next();
      }
    }
  }
}
```
