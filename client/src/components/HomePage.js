import React, {Component} from 'react';
import Unsplash, {toJson}from 'unsplash-js';
import {connect} from 'react-redux';
import * as actions from '../actions/HomePage';
import {addQuery, removeAll} from "../actions/HomePage";

class HomePage extends Component {

    state ={
        items:[],
        search: '',
        loading: false,
        message: 'Photos should appear there',
        saved: []
    };

    componentDidMount() {
        if (localStorage.getItem("saved")){
            this.setState ({saved: JSON.parse(localStorage.getItem("saved"))})
        }
};
        searchInput = (value)=>{
            this.setState({
                search: value
            })
        };

        noKeyWord = (value)=>{
            if (!value) {
                this.setState({
                    message: 'Please enter key word'
                })
            }
        };

    clearInput = ()=>{
        this.setState({search: ''})
    };

    fetchFotos = (e)=>{
        e.preventDefault();
        this.setState({loading:true});
        this.setState({message: ''});

        const unsplash = new Unsplash({
            applicationId: "fd6489766d571995d812c1390bbed250f644bfec78f0d118a54c0c8ed331a067",
            secret: '',
            callbackUrl: ''
        });

        unsplash.search.photos(`"${this.state.search}"`, 1, 30)
            .then(toJson)
            .then(json => {
                    console.log(json.results.length)
                    if (json.results.length > 0) {
                        this.setState({
                            items: json.results,
                        })
                    } else {
                        this.setState({
                            items: [],
                            message: 'Nothing was found'
                        })
                    }
                    this.clearInput();
                this.setState({loading:false})
                }
            )
            .catch(err => {
                console.log('Error happened during fetching!', err);
            })
    };

    render (){

            const show = this.state.items.map((item, i) => {
                return <img key={i}
                            src={item.urls.small} alt="Smiley" height="100" width="150"
                            onClick={()=>this.props.addQuery(item.urls)}

                />
            });

            const saved = this.props.queries.map((item, i) => {
                return <img key={i}
                            src={item.small} alt="Smiley" height="100" width="150"
                            onClick={()=>this.props.removePhoto(i)}
                />
            });

        const saved2 = this.state.saved.map((item, i) => {
            return <img key={i}
                        src={item.small} alt="Smiley" height="100" width="150"
                        onClick={()=>this.props.removePhoto(i)}
            />
        });

        return (

            <div className="homepage">
                <h1>PhotoShake</h1>
                <div className="left">
                    <form onSubmit={this.fetchFotos}>
                        <input placeholder="search"
                               autoFocus
                               onChange={(e) => this.searchInput(e.target.value)}
                               value={this.state.search}
                        />
                        <button
                            className="niceButton"
                            onClick={()=> this.noKeyWord(this.state.search)}
                        >Search</button>
                    </form>

                        <div className="grid">
                            <p>{this.state.items.length>0 ?'' : this.state.message }</p>
                                <div>{show}</div>
                            {this.state.loading? <div className="loader">Loading...</div> : null}
                        </div>
                </div>

                <div className="right">
                    <button
                        onClick={()=> localStorage.setItem("saved", JSON.stringify(this.props.queries))}
                    >Save</button>
                    <button
                    onClick={()=> {localStorage.removeItem("saved"); this.props.removeAll(this.props.queries); this.setState({saved: []})}}

                    >Remove saved</button>
                    <div className="queries">
                        {saved}{saved2}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        queries: state.queries
    }
};

export default connect (mapStateToProps, actions)(HomePage);