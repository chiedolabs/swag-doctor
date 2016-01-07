# Swag Doctor (Beta)
-

A library for generating RESTful API documentation with a json file or JS module that outputs a valid json object.

## Goals
The goal of Swag Doctor is to be a much simpler alternative to something like Swagger. The goal is to allow you to do a lot with a little.

[A live example of the output.](https://rawgit.com/chiedolabs/swag-doctor/master/examples/docs/index.html)

## Installation
	npm install -g swagdoc
	
## Usage
  	swagdoc -i {source file} -o {output directory}

## Example source files
###Basic Example (basic.json)
```js
{
  "name":"Example API Documentation",
  "description":"This is an example of the documentation you can create with Swag Doctor",
  "paths":{
    "/users/:id":{
      "actions":[
        {
          "name":"Get user",
          "method":"GET",
          "params":{
            "url":{
              "id":{
                "description":"The user's ID",
                "resolve":"1"
              }
            },
            content: '<p>The params for a user</p>',
          },
          "headers":[
            {
              "key":"Authorization",
              "resolve":"Bearer: 3838473948",
              "description":"This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with \"Bearer: \""
            }
          ]
        },
        {
          "name":"Update user",
          "method":"PUT",
          "params":{
            "url":{
              "id":{
                "description":"The user's ID",
                "resolve":"1"
              }
            },
            "body":{
              "name":{
                "description":"The user's name",
                "resolve":"Jane Doe"
              },
              "username":{
                "description":"The user's username",
                "resolve":"janedoe"
              }
            }
          }
        }
      ]
    }
  }
}
```

### Advanced Example (advanced.js):
For an advanced example, using a JS module instead of a json file to prevent code duplication, etc. [see the following](./examples/advanced.js).

## Further Reading

  * [Documentation]()
  * [Changelog](./CHANGELOG.md)
  * [Contributing](./CONTRIBUTING.md)

## Bugs

Swag Doctor is still in beta so please submit issues if you find any bugs.

## Feature Requests

- If you have feature requests please submit an issue and it will get put on the todo list.

## License
MIT

