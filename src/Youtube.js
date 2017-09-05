import React from 'react';

const API = 'AIzaSyBPJrMWMvFJF7EQLDDZ4e_ov0tOShzMSXc';
const query = 'h3h3Productions';
const result = 10;
var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&q=${query}&part=snippet,id&type=video&maxResults=${result}`;
// https://www.googleapis.com/youtube/v3/search?key=AIzaSyBPJrMWMvFJF7EQLDDZ4e_ov0tOShzMSXc&q=h3h3Productions&type=video&part=snippet
export class Youtube extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      youtubeResult: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        const youtubeResult = responseJson.items.map(obj => "https://www.youtube.com/embed/" + obj.id.videoId);
        this.setState({
          youtubeResult: youtubeResult
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.youtubeResult);
    return(
      <div>
        <button onClick={this.handleClick}>Get Youtube Videos</button>
        {
          this.state.youtubeResult.map((link, i) => {
            console.log(link);
            var frame = <div key={i} className="youtube"><iframe width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe></div>
            return frame;
          })
        }

      </div>
    );
  }
}
