import app from './app';

const PORT: number = 8080;

app.listen(PORT, () :void => {
  console.log(`Server is listening on port ${PORT}`);
});