console.log({
  filename: 'b',
  contentDiv: document.getElementById('content'),
  lastLoadedFile: typeof lastLoadedFile !== 'undefined' ? lastLoadedFile : undefined,
});
lastLoadedFile = 'b';
