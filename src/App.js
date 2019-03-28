import React, { Component } from 'react';
import CategoriesContainer from './containers/categories';
import CompaniesContainer from './containers/companies';
import ProfileComponent from './components/profile';
import LogoSlider from './components/logo-slider';
import './assets/css/index.css';
import Button from 'react-bootstrap/Button';
import data from "./data.json"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const categories = data.categories;
const companies = data.companies;
const logos = data.logos;

class App extends Component {
  Company({ match }){
    var result;
    companies.forEach(( company ) => {
      if(company.name === match.params.name)
      result = company;
    })

    return <ProfileComponent data = {result}/>
  }

  Category({ match }){
    var result;
    categories.forEach((category) => {
      if(category.name === match.params.name)
        result = category;
    })

    return <CompaniesContainer data={result}/>
  }

  Categories(){
    return <CategoriesContainer data={categories}/>
  }

  render() {
    return (
      <div>
      <LogoSlider logos={logos}/>
      <Router>
        <div>
          <Route exact path = "/" component = {this.Categories}/>
          <Route path = "/categories/:name" component = {this.Category}/>
          <Route path = "/companies/:name" component = {this.Company}/>

        </div>
      </Router>
    </div>
    );
  }
}

export default App;
