import React, {Component} from 'react';
// import { render } from '@testing-library/react';
// import classes from '*.module.css';

class App extends Component {

  // Constructor
  constructor(props){
    super(props);
    this.state = {
      name: '',
      messedge: '',
      // content: '',
      book: []
    }
    
  }
  componentWillMount(){
    this.getContent();
  }

  componentDidMount(){
    this.updateScroll();
  }

  // Other functions
  onChange = (e) => {
    let name = this.state.name;
    let mes = this.state.messedge;
    if (e.target.name === "firstname"){
      name = e.target.value;
      this.setState({name: name});
    }
    else if (e.target.name === "messedge"){
      mes = e.target.value;
      this.setState({messedge: mes});
      console.log(this.state.messedge)
    }
  }


  getContent = () => {
    fetch(`/api/submit?name=${encodeURIComponent(this.state.name)}&messedge=${encodeURIComponent(this.state.messedge)}`)
      .then(response => response.json())
      .then(state => this.setState({book : state}));
  }


  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.messedge){
      this.getContent();
    }
    console.log(this.state.book) 
    this.updateScroll();
  }

  updateScroll = () => {
    var element = document.getElementById("chat");
    console.log(element)
    element.scrollTop = element.scrollHeight;
}


  render() {
    return (
        <div class='container h-100'>
        <div class='card mh-100 mt-4 mb-4'>
          <div class = "card-body card-body-advanced" id="chat">
              <p class='align-bottom'>
                {this.state.book.map(mes => <div class="mt-4"><h5>{mes.name}</h5>{mes.messedge}</div>)}
              </p>
          </div>

          <div class='card-footer pb-5'>

            <h1>Hi Mark!</h1>
            <form onSubmit={this.onSubmit}>

              <div class = 'row'>
                <div class = 'mt-1 col-md-12 col-lg-2'>
                  <input placeholder="Enter your Name" onChange={this.onChange} value={this.state.name}  class="form-control" name="firstname"></input>
                </div>

                <div class = "mt-1 col-lg-8 col-xl-9">
                  <input placeholder="Enter messedge" onChange={this.onChange} name="messedge" class="form-control"></input>
                </div>

                <div class=" mt-1 col">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div>

            </form>
        </div>
      </div>
      </div>
    );}
}

export default App;
