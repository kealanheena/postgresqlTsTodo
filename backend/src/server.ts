import app from './app';

const PORT: number = 3000

app.listen(PORT, () :void => {
  console.log(`Server is listening on port ${PORT}`);
});