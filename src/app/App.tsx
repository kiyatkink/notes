import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { MainPage } from 'pages/MainPage';

export function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <Navbar />
      <MainPage />
    </div>
  );
}
