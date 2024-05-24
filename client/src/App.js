import React from 'react';
import './App.css';
import CryptoInpt from './components/CryptoInpt'

function App() {
  //const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
      <CryptoInpt></CryptoInpt>
  );
}

export default App;
