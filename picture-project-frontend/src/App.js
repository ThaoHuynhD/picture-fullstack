import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import Layout from './templates/Layout';
import HomePage from './pages/HomePage';
import PicturePage from './pages/PicturePage';
import { ConfigProvider, theme } from 'antd';

function App() {
  let userRoutes = [
    { path: '/', element: <Layout><HomePage /></Layout> },
    { path: '/Home', element: <Layout><HomePage /></Layout> },
    { path: '/Picture', element: <Layout><PicturePage /></Layout> },
  ]

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBorder: "gold",
            colorPrimary: "gold",
            colorPrimaryHover: "gold",
            colorText: "white",
            fontSize: "20px",
            colorIcon: "gold"
          },
          components: {
            Form: {
              labelColor: "gold",
              labelFontSize: "20px",
            },
            DatePicker: {
              colorText: "white",
              colorTextDescription: "white",
            },

          },
        }}>
        <BrowserRouter>
          <Routes>
            {userRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
