# Swag Doctor (Beta)

A library for generating RESTful API documentation with <b>a json file or JS module</b> that outputs a valid json object.

<b>This is not a library to auto-generate documentation like via comment blocks. Swag Doctor let's you define your API with pure Javascript.</b>

By allowing you to use a js module as input, you can remove redundancy in your API documentation input file.

Swag doctor believes that your REST API documentation shouldn't live within your source code. Your REST API documentation should stand alone. So while Swag Doctor is built with Javascript, you can use it do describe a REST API that will be built in any language.

### Key freebies
- Type inference
- Automatic examples based on your schema
- Swag

Technically, we could have put together an official Swag Doc spec but that's overkill. The spec is simple. It would be easiest for you to just review the getting started guide and the completed examples at the end.

[Getting started in 5 minutes](./GETTING-STARTED.md)

## Goals
The goal of Swag Doctor is to be a much simpler alternative to something like Swagger while offering you maximum flexibility by having the option to accept a JS module as input and reducing code duplication.

<a href="https://rawgit.com/chiedolabs/blog-app-in-many-stacks/master/back-ends/api-resources/rest/build/index.html" target="_blank">A live example.</a>

## Installation
	npm install -g swagdoc
	
## Usage
  	swagdoc -i {source file} -o {output directory}
  	
  	
 *Note that if you use es2015 features like 'import' and others, in your source file, you will need to make sure you have your babelrc configured and the necessary libraries installed as usual. Treat your input source file like any other js module you would create.*
 
### Reserved Characters.
 
*Note that your object's can not contain keys with <code>.</code> or <code>[]</code>. <code>.</code> and <code>[]</code> are reserved for performing some deep operations needed to make this library work. If you attempt to use either of those in your object keys, things will fail horribly.*

## Further Reading

  * [Getting Started](./GETTING-STARTED.md)
  * [Changelog](./CHANGELOG.md)
  * [Contributing](./CONTRIBUTING.md)

## Bugs

Swag Doctor is still in beta so please submit issues if you find any bugs.

## Feature Requests

- If you have feature requests please submit an issue and it will get put on the todo list.

## License
MIT

