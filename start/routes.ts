/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import Post from 'App/Models/Post';

Route.get('/', async () => ({ hello: 'world' }));

Route.get('posts', async ({ response }) => {
  try {
    const posts = await Post.all();

    return response.ok(posts);
  } catch (error) {
    return response.badRequest({ error: error.message });
  }
});

Route.post('posts', async ({ request, response }) => {
  try {
    const title = request.input('title', '');
    const description = request.input('description', '');
    const image = request.input('image', '');

    const post = new Post();
    post.merge({ title, description, image });
    await post.save();

    return response.ok(post.toJSON());
  } catch (error) {
    return response.badRequest({ error: error.message });
  }
});

Route.put('posts/:id', async ({ params, request, response }) => {
  try {
    const id = params.id;

    const post = await Post.findOrFail(id);

    const {
      title = post.title,
      description = post.description,
      image = post.image,
    } = request.only(['title', 'description', 'image']);

    post.merge({ title, description, image });
    await post.save();

    return response.ok(post.toJSON());
  } catch (error) {
    return response.badRequest({ error: error.message });
  }
});

Route.delete('posts/:id', async ({ params, response }) => {
  try {
    const id = params.id;

    const post = await Post.findOrFail(id);
    await post.delete();

    return response.ok('Deleted');
  } catch (error) {
    return response.badRequest({ error: error.message });
  }
});
