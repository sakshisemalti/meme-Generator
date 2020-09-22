import React, { Component } from 'react';

class MemeGenerator extends Component {
    constructor() {
      super();
      this.state = {
        font_size: "22",
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
      }
    }
    handleChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    handleClick = (event) => {
        event.preventDefault()
      const randomNumber = Math.floor(
        Math.random() * this.state.allMemeImgs.length
      );
      const randMemeImg = this.state.allMemeImgs[randomNumber].url
      this.setState({ randomImg: randMemeImg })
    };
    increaseFont = () => {};
    componentDidMount() {
      fetch("https://api.imgflip.com/get_memes")
        .then(data => data.json())
        .then(response => {
          const { memes } = response.data;
          this.setState({ allMemeImgs: memes });
        });
    }
    render() {
      return (
        <div>
          <div>
              <form className = "meme-form" onSubmit = {this.handleClick}>
             <input type="text"
              name="topText"
              placeholder="top text"
              onChange={this.handleChange}
              value={this.state.topText}
            />
            <br />
            
            <input
              type="text"
              name="bottomText"
              placeholder="bottom text"
              onChange={this.handleChange}
              value={this.state.bottomText}
            />
            <br/>
            <input
              type="number"
              name="font_size"
              placeholder="font size"
              onChange={this.handleChange}
              value={this.state.font_size}
            />
            <button onClick={this.handleClick}>Generate!</button>
            </form>
          </div>
          <div className="meme">
              <img src = {this.state.randomImg} alt ="prblm" />
            <h2 className="top" >{this.state.topText}</h2>
            <h2 className="bottom" > {this.state.bottomText}</h2>
          </div>
          
        </div>
      );
    }
  }
  
  export default MemeGenerator;