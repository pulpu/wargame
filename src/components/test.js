import React from 'react'
import { connect } from "react-redux";
import { stopAction } from '../actions/stopAction'
import { startAction }from '../actions/startAction'

class test extends React.Component {


    render(){
        return(

            <div>test
                <button className={this.props.nameOfReducer.rotating ? 'gigi' : 'fiif'} onClick={this.props.nameOfReducer.rotating ? this.props.stopAction : this.props.startAction}>click</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
   stopAction  : () => dispatch(stopAction),
   startAction : () => dispatch(startAction)
})

export default connect(mapStateToProps,mapDispatchToProps)(test);