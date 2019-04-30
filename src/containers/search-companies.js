import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../assets/css/search.css';
import '../assets/css/home.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/navbar';
import BottomButtons from '../components/menu-buttons';

class SearchCompanies extends Component {
  constructor(props) {
    super(props);
    let letters = [];
    for(let i= 65; i<91; i++){
      letters.push(String.fromCharCode(i))
    }
    this.state = {
        companies: props.data,
        alphabet:'',
        letters: letters,
        changed: true,
    }
}
  onAlphabetClick = (e) => {
    this.setState({alphabet: e.target.value})
  }
  prepareAlphabets = () => {
    let result = [<button className = 'boton-search' type="button" key ={0} onClick={this.onAlphabetClick} value = "">%</button>];
    for(let i=65; i<91; i++) {
      result.push(
        <button className = 'boton-search' type="button" key={i + 1} onClick={this.onAlphabetClick} value={String.fromCharCode(i)} >{String.fromCharCode(i)}</button>
      )
    }
    return result;
  }

  filterItems = (itemList) => {
    let result = [];
    const { alphabet } = this.state;
    if(itemList && alphabet) {
      result = itemList.filter((element) => (element.name.charAt(0).toLowerCase() === alphabet.toLowerCase()));
        result.unshift({'letter':alphabet})
    } else {
      if(!alphabet){
        for (var i = 0; i < this.state.letters.length; i++) {
          result.push({'letter':this.state.letters[i]})
          const items = itemList.filter((element) =>(element.name.charAt(0).toLowerCase() === this.state.letters[i].toLowerCase()));
          if(items){
          for (var j = 0; j < items.length; j++) {
            result.push(items[j])
          }}
      }
      }
    }
    result = result.map((item)=> {
      if(item.name){
      return <div ><Link to= {'/companies/' + item.name}className = 'search-font'>{item.name}</Link></div>}
    else{
      return <h3 className='main-letter'>{item.letter}</h3>
    }}
    )
    return result;
  }

    render() {
        const itemList = this.state.companies;
        // const itemList = undefined;
      const filteredList = this.filterItems(itemList);
    return (
      <div>
      <NavbarComponent title={"Buscar Empresa"}/>
      <div className='search-container'>
        {this.prepareAlphabets()}
        </div>
        <ul className = 'medium-container'>
          {filteredList}
        </ul>
      <BottomButtons disabled={false} previousPage={"/"}/>
      </div>
    );
    }
}

export default SearchCompanies;
