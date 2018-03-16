import { StackNavigator } from 'react-navigation';

import FBLoginView from './FBLoginView'

const App = StackNavigator({
  Home: { screen:FBLoginView },
});

export default App;
