## Getting Started in 5 Minutes

To help you learn how Swag Doctor works, we're going to start creating API documentation for a blog. We won't create complete documentation but you should get the idea.

1. [Install Swag Doctor](#install-swagdoc)
1. [Setup](#setup)
1. [First steps](#first-steps)
1. [Creating Paths](#creating-paths)
1. [Describing Your Paths](#describing-your-paths)
1. [Creating Actions](#creating-actions)
1. [Specifying Parameters](#specifying-parameters)
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
	
2. Go ahead and compile your docs by running `swagdoc -i test.json -o docs`.

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

> Note there may be some confusion in regards to the difference between a URL parameter and a query parameter. Take the following example /posts/:id/?comments=true&comments_limit=10. ```comments``` and ```comments_limit``` are query parameters. ```id``` is a URL parameter. 

1. Lets create a key called ```params``` in our ```update``` action.

	```
	...
    {
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
    }
	...
	```