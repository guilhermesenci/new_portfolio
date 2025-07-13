const ImageGenerator = (username: string, repoName: string) => {
  const baseUrl = `https://opengraph.githubassets.com/1/${username}/${repoName}`;
  return baseUrl;
};

export default ImageGenerator;
