export default (title?: string): void => {
  document.title = title ? `${title} | Typescript Fastify React Boilerplate` : 'title';
};
