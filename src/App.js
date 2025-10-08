import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Documentary from './components/Documentary';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      <Stats />
      <Documentary />
      <Contact />
    </div>
  );
}

export default App;
