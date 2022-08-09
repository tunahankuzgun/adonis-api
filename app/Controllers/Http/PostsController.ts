import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    try {
      const posts = await Post.all();

      return response.ok(posts);
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
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
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const id = params.id;

      const post = await Post.findOrFail(id);

      return response.ok(post.toJSON());
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
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
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const id = params.id;

      const post = await Post.findOrFail(id);
      await post.delete();

      return response.ok('Deleted');
    } catch (error) {
      return response.badRequest({ error: error.message });
    }
  }
}
