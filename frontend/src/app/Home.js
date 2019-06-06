// Imports
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchCategories} from "../category/CategoryActions";
import CardAnswer from "../card/CardAnswer";
import CategoryList from "../category/CategoryList";


class Home extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
            <React.Fragment>
                <CategoryList categories={this.props.categories.list}/>
                <CardAnswer/>
            </React.Fragment>

        )
    }
}

Home.propTypes = {
    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, {fetchCategories})(Home)
