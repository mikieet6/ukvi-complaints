# eslint-config-homeoffice [![Build Status](https://travis-ci.org/UKHomeOffice/eslint-config-homeoffice.svg?branch=master)](https://travis-ci.org/UKHomeOffice/eslint-config-homeoffice)

This is the `eslint` configuration used on a variety of UKHomeOffice projects, including:

* [brp](https://github.com/UKHomeOffice/brp_app)
* [hof example form](https://github.com/UKHomeOffice/hof-example-form)

The version of `eslint` currently supported is `0.23.0`.

# Configurations
Two configurations are currently supported:

* **default**
	- this is used for all frontend and node code
* **testing**
	- this adds in a few globals required for testing with mocha, and disables a few of the rules to make the tests more readable

They can be used as following:

Default:

```yml
extends:
- "homeoffice/config/default"
```

Testing:

```yml
extends:
- '../.eslintrc'
- 'homeoffice/config/testing'
```
> Note: To inherit from your project settings, you will need to inherit them first *then* override them using the testing configuration, due to the order of overrides
