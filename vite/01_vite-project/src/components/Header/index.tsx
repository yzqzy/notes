import styles from './index.module.scss';
import { devDependencies } from '../../../package.json';

export function Header() {
  return (
    <div className="p-20px text-center">
      <p className={ styles.header }>This is Header</p>
      <h1 className="font-bold text-2xl mb-2">
        vite version：{ devDependencies.vite }
      </h1>
    </div>
  )
};