import './App.css';
import '../src/assets/css/style.scss'
import { ConfigProvider } from "antd";
import AllRoutes from './routes/AllRoutes';


function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
            colorPrimary: "#1c849e",
            colorTextPlaceholder: "#000",
          },
        }}
      >
        <AllRoutes />
      </ConfigProvider>
    </div>
  );
}

export default App;
