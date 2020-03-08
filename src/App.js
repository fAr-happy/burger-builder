import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';

export default class App extends React.Component {
  render(){
    return(
      <Layout>
        <BurgerBuilder />
      </Layout> 
      
    )
  }
}

