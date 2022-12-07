import gulp from 'gulp';
const { src, dest, series } = gulp;
import { deleteAsync } from 'del';

const paths = {
  react_src: 'src/main/ui/build/**/*',
  react_dist: 'src/main/resources/static/'
};

function clean()  {
  return deleteAsync('src/main/resources/static/**', {force:true});
}

function copyReactCodeTask() {
  return src(`${paths.react_src}`).pipe(dest(`${paths.react_dist}`));
}

export default series(
  clean,
  copyReactCodeTask
);
