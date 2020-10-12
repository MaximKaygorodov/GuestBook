import React, {Component} from 'react';
import './style.css'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      message: '',
      book: []
    }
    
  }
  
  componentDidMount(){
    const url = "https://servername123.herokuapp.com/api/request_data";
    fetch(url)
      .then(response => response.json())
      .then(state => this.setState({book : state}));
    console.log("data requested")
    this.updateScroll();
  }
  onChange = (e) => {
    let name = this.state.name;
    let mes = this.state.message;
    if (e.target.name === "firstname"){
      name = e.target.value;
      this.setState({name: name});
    }
    else if (e.target.name === "message"){
      mes = e.target.value;
      this.setState({message: mes});
      // console.log(this.state.message)
    }
  }


  getContent = () => {
    
    const url = "https://servername123.herokuapp.com/api/submit?name=${encodeURIComponent(this.state.name)}&message=${encodeURIComponent(this.state.message)}";
    alert(url)
    fetch(url)
      .then(response => response.json())
      .then(state => this.setState({book : state}));
  }
     
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.message){
      this.getContent();
    }
    console.log(this.state.book) 
    this.updateScroll();
  }
    
  updateScroll = () => {
    var element = document.getElementById("chat");
    // console.log(element)
    element.scrollTop = element.scrollHeight;
}

  render() {
    return (
        <div class='container h-100'>
          <div class='m-3'>
            <h1>Guest Book</h1>
          </div>
          <div class='card card-adv mt-4 mb-4'>
            <div class = "card-body card-body-adv" id="chat">
                  {this.state.book.map(mes => <div class="mt-4"><h5>{mes.name}</h5>{mes.message}</div>)}
            </div>

            <div class='card-footer'>

              {/* <h3>Please, enter your name and what you want to say</h3> */}
              <form onSubmit={this.onSubmit}>

                <div class = 'row'>
                  <div class = 'mt-1 col-md-12 col-lg-2'>
                    <input placeholder="Enter your Name" onChange={this.onChange} value={this.state.name}  class="form-control" name="firstname"></input>
                  </div>

                  <div class = "mt-1 col-lg-8 col-xl-9">
                    <input placeholder="Enter message" onChange={this.onChange} name="message" class="form-control"></input>
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
