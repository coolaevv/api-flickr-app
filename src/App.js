import React, { Component } from 'react';
import './App.css';
import LikeIcon from './img/like.png';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
    };
  }

  componentDidMount(){
    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=c13b7fa2f1506c0898c412f8d6975d83&per_page=75&page=1&format=json&nojsoncallback=1';
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        let acc = 'https://www.flickr.com/' + pic.owner;
        let id = pic.id;
        let AlertId = () => {
          let u_id = document.getElementById(id);
          u_id = u_id.getAttribute('id');
          alert(u_id);
        }
        return(
          <div className="pic">
            <div className="nikName">
              <strong>{pic.owner}</strong>
            </div>
            <div className="picture">
              <img alt="dogs" src={srcPath}/>
            </div>
            <div className="options">
              <ul>
                <li className="like" id={id} onClick={AlertId}><img src={LikeIcon} /></li>
                <li><a href={acc} target="_blank">Посмотреть</a></li>
              </ul>
            </div>
          </div>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  render() {
    return (
      <div className="pictures-list">
        {this.state.pictures}
      </div>
    );
  }
}

export default App;