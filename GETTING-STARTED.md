## Getting Started in 5 Minutes

To help you learn how Swag Doctor works, we're going to start creating API documentation for a blog. We won't create complete documentation but you should get the idea.

1. [Install Swag Doctor](#install-swagdoc)
1. [Setup](#setup)
1. [First steps](#first-steps)
1. [Creating Paths](#creating-paths)
1. [Describing Your Paths](#describing-your-paths)
1. [Creating Actions](#creating-actions)
1. [Specifying Parameters](#specifying-parameters)
1. [Defining Responses](#defining-responses)
1. [Defining Headers](#defining-headers)
1. [A Complete Basic json Example](./examples/basic.json) 
1. [A Complete Advanced js module Example](./examples/advanced.js) 

### <a name="install-swagdoc">Install Swag Doctor</a>
	npm install -g swagdoc

### <a name="setup">Setup</a>
1. Create a new directory on your computer and navigate to it.

2. Create a file with the name example.json

### <a name="first-steps">First steps</a>

1. Open example.json and add the following.

	```
	{
		"name": "Blog App Documentation",
		"description": "This is the documentation for the blog app.",
		"paths": {}
	}
	```
	
2. Go ahead and compile your docs by running `swagdoc -i example.json -o docs`.

3. Now open docs/index.html.

4. You'll notice that your documentation is bare. That's because we need some paths. Let's do that next.

### <a name="creating-paths">Creating Paths</a>

1. Now let's create some empty paths. To do so, edit the ```paths``` key in your json file as show below.

	```
	...
	"paths": {
		"/posts": {
		},
	    "/posts/:id": {
		}
	}
	...
	```
2. Compile your docs and view the output.
3. Notice that you now have two paths available for your API but the documentation doesn't tell you anything about them. Let's add some descriptive content about your paths.

### <a name="describing-your-paths">Describing Your Paths</a>
1. Let's add some descriptive content to our ```/posts/:id``` path. Go ahead and modify the ```/posts/:id``` key of your paths object to match the following under a key named ```description```.

	```
	...
	"/posts/:id": {
		"description": "<h3>Details</h3><p>Some details about the posts/:id path. You could add whatever you want here.</p>"
	},
	...
	```
	
2. Compile your docs and view the output.
3. Note that this could get messy if you have a lot of content in your description. Using a JS module that outputs an object instead of using a static json file as we are doing now would allow you to use es6 template strings for ```description``` as shown in the [advanced example](./examples/advanced.js).
4. Now that we've got some descriptve content, let's add the meat. The actions.

### <a name="creating-actions">Creating Actions</a>
1. ```actions``` is an array in your path object. Let's add an action for updating a post and another for deleting a post to ```/posts/:id```

	```
	...
	"/posts/:id": {
      "actions": [
        {
          "name": "Update post",
          "method": "PUT",
          "description": "Allows someone to update a post."
        },
        {
          "name": "Delete",
          "method": "DELETE",
          "description": "Allows someone to update a post."
        }
      ]
	},
	...
	```
	
2. OK, so now that we've got a couple of actions, how do we specify what parameters it can accept? Let's add some parameters.

### <a name="specifying-parameters">Specifying Parameters</a>
There are three types of parameters you can specify, url parameters, body parameters and query parameters.

1. Lets create a key called ```params``` in our ```update``` action and lets give make the ```params``` key an object. Add a key in the ```params``` object by the name of ```query```. This is how we will specify our query parameters.

	```
	...
  	"params": {
    	"query": {
      		"comments": {
        		"description": "Boolean for whether or not comments should be returned with the response"
      		},
      		"comments_limit": {
        		"description": "The number of comments to return if comments are being returned."
      		}
    	}
  	}
	...
	```
	>Note there may be some confusion in regards to the difference between a URL parameter and a query parameter. Take the following example /posts/:id/?comments=true&comments_limit=10. ```comments``` and ```comments_limit``` are query parameters. ```id``` is a URL parameter. 
	
2. Now let's add a key in the ```params``` object by the name of ```url```. This is how we will specify our url parameters.

	```
  	...
 	"params": {
 		...
   		"url": {
      		"id": {
      			"description": "The ID of the post you want to update."
      		}
    	}
 	}
	...
	```
		
3. Now let's add a key in the ```params``` object by the name of ```body```. This is how we will specify our body parameters.

	```
  	...
 	"params": {
 		...
 		"body": {
 			"post": {
 				"example": {
 					"title": {
 						"example": "I love chicken.",
 						"type": "Title String",
 						"description": "The post title"
 					},
 					"tags": {
 						"example": ["chicken","love"],
 						"description": "All of the tags for a post"
 					}
 				},
 				"description": "Data to update on the post"
 			}
 		}
 	}
 	...
 	```
 	
 	
	>This is probably the only gotcha for Swagdoc. You'll notice that you'll need to represent each nested layer of your objects as inside an `example` key. When you generate the example below, it should make sense. The reasoning for this is that we need a level where we can define descriptions. The type of the parameter is inferred from the example but you can override that and specify a type if you'd like as you see for ```title```.
	
4. Now, let's add some responses.

### <a name="defining-responses">Defining Responses</a>
1. Let's create two responses, a ```404``` response and a ```200``` response for the ```update``` action in the ```/posts/:id``` path.

	```
	...
    "responses":[
        {
            "name":"Not found Response",
            "status":404,
            "body":"Not found"
        },
        {
            "name":"Success Response",
            "status":200,
            "body":{
                "user":{
                    "description":"The user",
                    "example":{
                        "post":{
                            "example":{
                                "title":{
                                    "example":"I love chicken.",
                                    "description":"The post title"
                                },
                                "tags":{
                                    "example":[
                                        "chicken",
                                        "love"
                                    ],
                                    "description":"All of the tags for a post"
                                }
                            },
                            "description":"Data to update on the post"
                        }
                    }
                }
            }
        }
    ]
	...
	```
	
	>Note that types are automatically inferred from your example value and you get a response example as well as tabular information all from the above. This helps to limit repetition. You could also specify a ```type``` specificially if you wanted to override the inferred type output. When you use a JS module to create your docs, you can share a lot of the same code between your responses and paramaters. It's quite a time saver and helps reduce errors.
	
2. Lastly, we can't forget headers.

### <a name="defining-headers">Defining Headers</a>

1. Defining headers for an action is easy. Lets create a header for Authorization on the ```update``` action for ```/posts/:id```

	```
	...
	"headers": [
		{
		"key": "Authorization",
		"description": "This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with 'Bearer: '",
		"example": "Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI"
		}
	]
	```

2. You can add as many headers as you'd like by adding to the array.

### Closing Thoughts
Swagdoc should help you reduce repetition for API documentation and should give you a lot of control. The goal is to stay fairly simple so if there's functionality you're looking for, you can use description fields for the time being or Submit a Feature request.
	
### You're now a pro.
See the below for completed code examples.

1. [The completed example](./examples/basic.json) 
1. [A complete Advanced example using a js module](./examples/advanced.js) 
1. <a href="https://github.com/chiedolabs/blog-app-in-many-stacks/blob/master/back-ends/api-resources/rest/src/apidocs.js" target="_blank">An even more complete Advanced example using a js module</a>
