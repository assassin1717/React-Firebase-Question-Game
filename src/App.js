import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Init from './Home/Init';
import Categories from './Game/Categories';
import Questions from './Game/Questions';
import Results from './Game/Results';
import Ranking from './Game/Ranking';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' exact component={Init} />
        <Route path='/categories' component={Categories} />
        <Route path='/questions/:name' component={Questions} />
        <Route path='/results' component={Results} />
        <Route path='/ranking' component={Ranking} />
      </div>
    </BrowserRouter>
  );
}

export default App;
