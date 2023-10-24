import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';

export function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <Navbar />
      <div className="content-page">
        Hello
      </div>
    </div>
  );
}
