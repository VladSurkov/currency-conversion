import Main from './Components/Main/Main';
import MyContext from './Components/Context/Context';

function App() {
  return (
    <MyContext>
      <Main />
    </MyContext>
  );
}

export default App;
