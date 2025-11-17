import { Fragment, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: FC = () => (
  <Fragment>
    <ToastContainer />
    <Navbar />
    <main className='pt-16 min-h-[calc(100vh-64px-56px)] bg-slate-900'>
      <Outlet />
    </main>
    <Footer />
  </Fragment>
);

export default App
