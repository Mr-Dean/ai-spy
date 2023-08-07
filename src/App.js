import './App.css';
import Header from './components/Header/Header';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'



function App() {
  return (
    <div className="App">
      <Header />
      <ImageLinkForm />
      <ParticlesBg type="cobweb" color="#DADADA" num={100} bg={true} />
      {/*
      <ImageRecog /> */}
    </div>
  );
}

export default App;
