import { StackNavigator } from 'react-navigation';

import FBLoginView from './FBLoginView';
import TransactionsView from './TransactionsView';

const App = StackNavigator({
  Home: { screen:FBLoginView },
  Transactions: { screen:TransactionsView },
});

export default App;
