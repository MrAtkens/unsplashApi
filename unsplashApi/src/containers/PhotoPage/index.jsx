import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import ImageZoom from 'react-medium-image-zoom'
import { Grid, Typography, Fab } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import GetAppIcon from '@material-ui/icons/GetApp';
import CollectionsIcon from '@material-ui/icons/Collections';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import AwesomeSlider from 'react-awesome-slider';

import 'react-awesome-slider/dist/styles.css';
import './style.css'

import { getUnsplashPhotoById, findByTags } from '../../actions'


class PhotoPage extends Component {

  componentDidMount(){
    const url = window.location.href
    const id = url.substring(22)
    this.props.getUnsplashPhotoById(id)
  }

  handleTagClick = (e) => {
    this.props.findByTags(e.target.value)
  }

  // handleDownload = () => {
  //   this.props.downloadPhoto(this.props.image.links.download_location)
  // }

  render(){
    const data = this.props.image
    return(
    <div>
      <Grid className="photoPage" container>
        <Grid item xs={6}>
          <h3 className="text-center pdb-10">{data.alt_description}</h3>
          <AwesomeSlider  play={true} cancelOnInteraction={false} interval={6000}>
              <div>
                <ImageZoom
                  className="zoompro"
                  image={{
                    src: data.urls.small,
                    alt: data.alt_description,
                  }}
                  zoomImage={{
                    src: data.urls.full,
                    alt: data.alt_description
                  }}/>
              </div>  
              <div>
                <ImageZoom
                  className="zoompro"
                  image={{
                    src: data.urls.small,
                    alt: data.alt_description,
                  }}
                  zoomImage={{
                    src: data.urls.regular,
                    alt: data.alt_description
                  }}/>
              </div>
              <div>
                <ImageZoom
                  className="zoompro"
                  image={{
                    src: data.urls.small,
                    alt: data.alt_description,
                  }}
                  zoomImage={{
                    src: data.urls.raw,
                    alt: data.alt_description
                  }}/>
              </div>
              <div>
                <ImageZoom
                  className="zoompro"
                  image={{
                    src: data.urls.small,
                    alt: data.alt_description,
                  }}
                  zoomImage={{
                    src: data.urls.small,
                    alt: data.alt_description
                  }}/>
              </div>    
            </AwesomeSlider>
      </Grid>
        <Grid item xs={6}>
          <div className="info-right">
            <div className="user-place">
              <a href={`${data.user.links.html}`}>
                <img src={data.user.profile_image.large} alt={data.alt_description} className="user-img" />   
              </a>                       
              <div className="user-info-text">
                <a href={`${data.user.links.html}`}><h3>{data.user.username}</h3></a>
                <Typography variant="h2">{data.user.name}</Typography>
                {data.user.location === null ? (null):(<h4>Location: {data.user.location}</h4>)}
                <hr/>
                <div className="user-stats">
                  <Typography className="stats" variant="subtitle1"> <ThumbUpIcon/> {data.user.total_likes}</Typography>
                  <Typography className="stats" variant="subtitle1"> <a href={`${data.links.html}`}><PhotoSizeSelectActualIcon/></a> {data.user.total_photos}</Typography>
                  <Typography className="stats" variant="subtitle1"> <CollectionsIcon/> {data.user.total_collections}</Typography>
                </div>
              </div>
            </div>
            <div className="image-description">
              <h3>Full resolution: {data.width}x{data.height}</h3>
              {data.location.title === null ? (null):(<h3>Location: {data.location.title}</h3>)}
              <h3>Created date: <Moment format="HH:mm DD/MM/YYYY">{data.created_at}</Moment></h3>
              <h3>Promoted date: <Moment format="HH:mm DD/MM/YYYY">{data.promted_at}</Moment></h3>
              <h3>Updated date: <Moment format="HH:mm DD/MM/YYYY">{data.updated_at}</Moment></h3>
              <div className="tag-layer">
                {data.tags.map(element => {
                return <Link key={element.title} to="/"><button onClick={this.handleTagClick} className="tags" value={element.title}>{element.title}</button></Link>
                })}
              </div>
              <h3 className="description">Description: {data.description}</h3>
              <h3>Link to image: <a className="link" href={`${data.links.html}`}>{data.links.html}</a></h3>
            </div>
          </div>    
        </Grid>
      </Grid>
      <Grid className="stats-container">
       <Grid container>
          <Grid item xs={4}>
            <div>
              <a href={`${data.links.html}`}>
                <Fab color="primary" variant="extended" aria-label="views">
                  <VisibilityIcon className="icon-button"/>
                  <p className="icon-text">
                    {data.views}
                  </p>
                </Fab>
              </a>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <a href={`${data.links.html}`}>
                <Fab color="primary" variant="extended" aria-label="views">
                  <ThumbUpAltIcon className="icon-button"/>
                  {data.likes}
                </Fab>
              </a>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
            <a href={`${this.props.image.links.download}`}>
              <Fab color="primary" variant="extended" aria-label="views">
                <GetAppIcon className="icon-button"/>
                {data.downloads}
              </Fab>
            </a>
            </div>
          </Grid>
       </Grid>
      </Grid>
      <div className="social">
        {data.user.twitter_username === null ? (null) : (
        <a href={`https://twitter.com/${data.user.twitter_username}`}>
          <Fab className="social-icon" color="primary" aria-label="Twitter Account">
            <TwitterIcon />
          </Fab>
        </a>)}
        {data.user.instagram_username === null ? (null) : (
        <a href={`https://www.instagram.com/${data.user.instagram_username}`}>
          <Fab className="social-icon" color="secondary" aria-label="Instagram Account">
            <InstagramIcon />
          </Fab>
        </a>)}
      </div>
    </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    image: store.photoStockReducer.image,
  }
}

const mapDispatchToProps = {
    getUnsplashPhotoById,
    findByTags
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(PhotoPage)