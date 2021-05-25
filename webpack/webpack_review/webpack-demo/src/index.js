import avator from './images/avator.png';
import './scss/index.scss';

const app = document.getElementById('app');
const image = new Image();

image.src = avator;
image.classList.add('avator');

app.append(image);

