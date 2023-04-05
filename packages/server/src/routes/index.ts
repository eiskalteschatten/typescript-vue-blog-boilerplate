import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import renderFrontend from '~/lib/renderFrontend';

export default async (app: FastifyInstance) => {
  app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const testString = await renderFrontend();
    reply.type('text/html').send(testString);
  });
};
