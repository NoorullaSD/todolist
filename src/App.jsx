import { MyAppProvider } from "./component/context.jsx";
import ToDoList from './component/toDoList.jsx';

function App() {
  return (
    <MyAppProvider>
      <ToDoList />
    </MyAppProvider>
  )
}

export default App
