import React, { Component,PropTypes } from 'react';


  function wapperComponentsLifecycle({DidMount}) {
    return ComposedComponent=>{
      return class Wapper extends React.Component {
        componentWillMount(){

        }
        componentDidMount(){
          DidMount({props:this.props});
        }
        render(){
          return <ComposedComponent {...this.props} />
        }
      }
    }
  }


export default  wapperComponentsLifecycle;
