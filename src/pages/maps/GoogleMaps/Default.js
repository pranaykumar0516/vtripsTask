import React from "react";
import styled from "styled-components";

import { CardContent, Card as MuiCard, Typography, Input, Button, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from "google-map-react";
import { Room, Favorite } from "@material-ui/icons";
import Axios from "axios";
import WorkIcon from '@material-ui/icons/Work';
import { green } from "@material-ui/core/colors";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const GoogleMapReactWrapper = styled.div`
  height: 300px;
  width: 100%;
`;

class Default extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markerList : [],
      favouritesList: [],
      address: '',
      zoom: 14,
      show: false,
      showMarkerOf: ''
    }
  }
  static defaultProps = {
    center: {
      lat: 17.3896,
      lng: 78.4954
    },
    zoom: 14
  };

  componentDidMount(){
    var { center } = this.props
    this.fetchGooglePlaces(center.lat, center.lng)
    this.fetchFavouriteLocations()
  }

  getMapOptions = maps => {
    return {
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      scaleControl: true,
      scrollwheel: false,
      streetViewControl: true
    };
  };

  onChangeAddress (e) {
    this.setState({
      address: e.target.value
    })
  }

  async fetchGooglePlaces (lat = 33.8670522, lng = 151.1957362, radius = 1500) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + radius +'&type=restaurant&keyword=cruise&key=AIzaSyCeUjBrlxuploFL39cljsHCdNAAnRaqklA'
    var response = await fetch(proxyurl + url)
    var responseJson = await response.json()
    this.setState({
        markerList : responseJson.results || []
    })
    if (!responseJson.results) {
        alert('No Restaurants found in this area')
    }
}

  onButtonClicked () {
    var { address } = this.state
    var superThis = this
    geocodeByAddress(address)
      .then(results => {
            this.setState({
                address: results[0].formatted_address
            })
            return getLatLng(results[0])
        })
      .then(latLng => {
            this.setState({
              zoom: 30,
              currentZoomLevel: 30,
              currentCenter: latLng
            })
            superThis.fetchGooglePlaces(latLng.lat, latLng.lng, 1500)
            return null
        })
      .catch(error => console.error('Error', error));
  }

  _onChildClick = (key, childProps) => {
    this.setState({show: childProps.name, showMarkerOf : childProps.name})
  }
  _onClick = () => {
    this.setState({show: false, showMarkerOf : ''})
  }

  fetchFavouriteLocations () {
    Axios
      .get('http://162.214.74.80:5000/user/favorite/list/pranay')
      .then(response => {
          if(response.data) {
              if(response.status === 200 && response.data) {
                 this.setState({
                   favouritesList: response.data
                 })
              } else {
                alert("No Favourites available");
                this.setState({
                  favouritesList: []
                })
              }
          } else {
            // alert("fetching favourites error");
            this.setState({
              favouritesList: []
            })
          }
      })
      .catch(error => {
          console.log(error)
          this.setState({
            favouritesList: []
          })
          alert(error)
      })
  }

  removeFromFavourites (id) {
    Axios
      .delete('http://162.214.74.80:5000/user/favorite/remove/' + id)
      .then(response => {
          if(response.data) {
              if(response.status === 200) {
                  alert("Removed from favourites");
                  this.fetchFavouriteLocations()
              } else {
                alert("Removing from favourites failed");
              }
          } else {
            alert("Removing from favourites error");
          }
      })
      .catch(error => {
          console.log(error)
          alert(error)
      })
  }

  addToFavourites (markerDetails) {
    var body = {
      "name":markerDetails.name,
      "address": markerDetails.vicinity,
      "city": this.state.address || "-",
      "latitude": markerDetails.geometry.location.lat,
      "longitude": markerDetails.geometry.location.lng,
      "username":"pranay"
    }
    Axios
      .post('http://162.214.74.80:5000/user/favorite/add', body)
      .then(response => {
          if(response.data) {
              if(response.status === 200) {
                  alert("Added to favourites");
                  this.fetchFavouriteLocations()
              } else {
                alert("Adding to favourites failed");
              }
          } else {
            alert("Added to favourites error");
          }
      })
      .catch(error => {
          console.log(error)
          alert(error)
      })
  }

  render() {
    return (
    <Card mb={1}>
      <CardContent>
        {/* <Typography variant="h6" gutterBottom>
          Default Map
        </Typography> */}
        <Input
          onChange={(e) => this.onChangeAddress(e)}
          placeholder= {'Enter Address'}
        />
        <Button variant="contained" onClick={()=>this.onButtonClicked()}>Search</Button>
        {/* <Typography variant="body2" gutterBottom>
          Displays the default road map view.
        </Typography> */}

        <Spacer mb={6} />

        <GoogleMapReactWrapper>
          <GoogleMapReact
            options={this.getMapOptions}
            bootstrapURLKeys={{
              key: "AIzaSyCeUjBrlxuploFL39cljsHCdNAAnRaqklA"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
            onChildClick={this._onChildClick}
            onClick={this._onClick}
            zoom={this.state.currentZoomLevel}
            center={this.state.currentCenter}
          >
          {
            this.state.markerList.map((eachMarker)=>{
              return <Marker addToFavourites={()=> this.addToFavourites(eachMarker)} address = {eachMarker.vicinity} showMarkerOf={this.state.showMarkerOf} name={eachMarker.name} show={this.state.show} lat={eachMarker.geometry.location.lat} lng={eachMarker.geometry.location.lng} />
            })
          }
          {
            this.state.favouritesList.map((eachMarker)=>{
              return <FavMarker id={eachMarker.id} removeFromFavourites={()=> this.removeFromFavourites(eachMarker.id)} showMarkerOf={this.state.showMarkerOf} name={eachMarker.name} show={this.state.show} lat={eachMarker.latitude} lng={eachMarker.longitude} />
            })
          }
          </GoogleMapReact>
        </GoogleMapReactWrapper>
      </CardContent>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          List of Favourites
        </Typography>

        <Spacer mb={6} />

        <List component="nav" aria-label="main mailbox folders">
          {
            this.state.favouritesList ? this.state.favouritesList.map((eachMarker)=>{
              return <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Favorite />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={eachMarker.name} secondary={eachMarker.address}/>
                {/* <ListItemText primary={''} secondary={eachMarker.city}/> */}
              </ListItem>
            })
            : 
            <ListItem button>
                <ListItemText primary={'No Favourites available'} />
              </ListItem>
          }
          {/* <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Drafts" />
          </ListItem> */}
        </List>
      </CardContent>
    </Card>
  );
  }
}

// const Marker = props => {
//   return <>
//     <div className="pin">
//       <Room color={'primary'} fontSize={'large'} />
//     </div>
//     <div className="pulse"></div>
//   </>
// }

const Marker = props => (
  <React.Fragment>
    <div className="pin">
      <Room color={'primary'} fontSize={'large'} />
    </div>
    <InfoWindow
      show={props.show}
      name={props.name}
      showMarkerOf={props.showMarkerOf}
      addToFavourites = {props.addToFavourites}
      address = {props.address}
    />
  </React.Fragment>
)

const FavMarker = props => (
  <React.Fragment>
    <div className="pin">
      <Room style={{ color: green[500] }} fontSize={'large'} />
    </div>
    <InfoWindow
      show={props.show}
      name={props.name}
      showMarkerOf={props.showMarkerOf}
      addToFavourites = {props.addToFavourites}
      removeFromFavourites = {props.removeFromFavourites}
      id={props.id}
    />
  </React.Fragment>
)

const InfoWindow = props => (
  props.show && (props.name === props.showMarkerOf) ? (
    <div style={{width: 150, height: 200, backgroundColor: 'white'}}>
    <Typography variant="h5" gutterBottom>
    {props.name}
        </Typography> 
    <Typography variant="body2" gutterBottom>
          {props.address}
    </Typography>
    {props.address ? <Button color="primary" variant="text" onClick={()=>props.addToFavourites(props.showMarkerOf)}>Add to Favourites</Button>
    : <Button color="primary" variant="text" onClick={()=>props.removeFromFavourites(props.id)}>Remove from Favorites</Button>}
    </div>
  ) : null
)

export default Default;
