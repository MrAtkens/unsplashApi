import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core';
import { Fade } from 'react-reveal';
import Image from 'material-ui-image';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

import { getAllUnsplashPhoto, findUnsplahPhoto } from '../../actions'


class MainPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      onHoverStatus: false,
      pageCount: 20,
      pageRangeDisplayed: 8,
      elementCountPerPage: 16,
      selectedPage: 0,
      findWord: "",
      offset: 0,

      isFirst: false
    };

    this.findStroke = React.createRef();
  }

  componentDidMount(){
    if(this.props.keyWord === ""){
      this.props.getAllUnsplashPhoto(this.state.selectedPage, this.state.elementCountPerPage)
    }
    else{
      this.props.findUnsplahPhoto(this.props.keyWord, this.state.selectedPage, this.state.elementCountPerPage)
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.pageCount !== prevProps.pageCount) {
      this.setState({ pageCount: this.props.pageCount })
    }
  }

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({selectedPage: selected})
    let addPage = this.state.pageCount-this.state.pageRangeDisplayed
    if(this.state.findWord === ""){
    if(addPage <= selected){
      let newPageCount = this.state.pageCount + this.state.pageRangeDisplayed
      this.setState({ pageCount: newPageCount})
    }
      this.props.getAllUnsplashPhoto(selected, this.state.elementCountPerPage)
    }
    else{
      this.props.findUnsplahPhoto(this.state.findWord, selected, this.state.elementCountPerPage)
    }
  };

  handleFindClick = (e) => {
    if (e.key === 'Enter') {
      let selectedPage = this.state.selectedPage
      if(this.isFirst === false){
        this.setState({ selectedPage: 0})
        this.setState({ isFirst: true})
        selectedPage = 0
      }
      const findStroke = this.findStroke.current.value
      this.setState({ findWord: findStroke })
      this.props.findUnsplahPhoto(findStroke, selectedPage, this.state.elementCountPerPage)
    }
  }

  render(){
    return(
      <Grid>
        <Grid className={'center findContainer'} item xs={12}>
          <Fade top>
            <div className="searchContainer">
              <input type="text" placeholder="Search..." name="findStroke" onKeyPress={this.handleFindClick} ref={this.findStroke}/>
              <div className="search"></div>
            </div>
          </Fade>
        </Grid>
        {this.props.images.length === 0 ? (<h1>Извините мы не нашли фотографий по этому запросу</h1>):(<div>
          <Grid className={"photoStockPage"} container>
          {this.props.images.map(element => {
            return <Grid className={"container"} item xs={3} key={element.id}>
            <Link to={`/${element.id}`}>
              <Image 
              src={element.urls.regular}
              className={"image"}
              key={element.id}
              alt={element.alt_description}
              disableSpinner
              />
              <div className={"middle"}>
                <Typography className={"text"} variant="h4">
                  {element.user.username}
                </Typography>
                <Typography className={"text"} variant="h3">
                  {element.alt_description}
                </Typography>
                <Typography className={"text"} variant="body1">
                  {element.description}
                </Typography>
              </div>
            </Link>
          </Grid>
          })}
      </Grid>
      <Grid className={'center'} item xs={12}>
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={5}
          pageRangeDisplayed={this.state.pageRangeDisplayed}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination modal-6'}
          activeClassName={'active'}/>
      </Grid>
    </div>)}
        <ToastContainer
        position={'bottom-left'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover/>  
    </Grid>
      );
  }
}

const mapStateToProps = store => {
    return {
      images: store.photoStockReducer.images,
      pageCount: store.photoStockReducer.pageCount,
      keyWord: store.photoStockReducer.keyWord
    }
  }

const mapDispatchToProps = {
  getAllUnsplashPhoto,
  findUnsplahPhoto
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(MainPage)