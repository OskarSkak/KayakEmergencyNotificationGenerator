import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const AppContext = React.createContext(null);
// This is the "main class"
const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppContext.Provider value={null}>
        <RootNavigation></RootNavigation>
      </AppContext.Provider>
    </ApplicationProvider>
  );
};

//exporting the functional component
export default App;
