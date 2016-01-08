## Getting Started in 5 Minutes

To help you learn how Swag Doctor works, we're going to start creating API documentation for a blog. We won't create complete documentation but you should get the idea.

1. [Install Swag Doctor](#install-swagdoc)
1. [Setup](#setup)
1. [First steps](#first-steps)
1. [Creating Paths](#creating-paths)
1. [Describing Your Paths](#describing-your-paths)
1. [Creating Actions](#creating-actions)
1. [A Complete Example](#a-complete-example) 

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
1. Let's add some descriptive content to our ```/posts/:id``` path. Go ahead and modify the ```/posts/:id``` key of your paths object to match the following under a key named ```content```.

	```
	...
	"/posts/:id": {
		"content": "<h3>Details</h3><p>Some details about the posts/:id path. You could add whatever you want here.</p>"
	},
	...
	```
	
2. Compile your docs and view the output.
3. Note that this could get messy if you have a lot of content. Using a JS module that outputs an object instead of using a static json file as we are doing now would allow you to use es6 template strings for ```content``` as shown in the [advanced example](./examples/advanced.js).
4. Now that we've got some descriptve content, let's add the meat. The actions.

### <a name="creating-actions">Creating Actions</a>
1. ```actions``` is an array in your path object. Let's add an action for creating a post and another for deleting a post to ```/posts/:id```

	```
	...
	"/posts/:id": {
      "actions": [
        {
          "name": "Update post",
          "method": "POST",
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
	
### <a name="a-complete-example">A Complete Example</a>
```
...
```