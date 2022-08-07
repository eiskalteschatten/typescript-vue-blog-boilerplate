export default (title?: string): void => {
  document.title = title ? `${title} | Charlotte` : 'title';
};
