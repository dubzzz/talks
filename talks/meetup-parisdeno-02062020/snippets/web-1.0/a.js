console.log({
  filename: 'a',
  contentDiv: document.getElementById('content'),
  lastLoadedFile: typeof lastLoadedFile !== 'undefined' ? lastLoadedFile : undefined,
});
lastLoadedFile = 'a';
