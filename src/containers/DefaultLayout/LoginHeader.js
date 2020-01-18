import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
// import sygnet from '../../assets/img/brand/sygnet.svg'
// import logo from '../../assets/img/brand/logo.svg'
import ERP_Logo from '../../assets/img/brand/sound.png'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    constructor() {
        super();
        this.state = {
            userId: null,
        };
    }

    componentDidMount = () => {
        this.setState({
            userId: localStorage.getItem("userId")
        })
    }

    componentWillMount = () => {
        this.setState({
            userId: localStorage.getItem("userId")
        })
    }


    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{ src: ERP_Logo, width: 150, height: 54, alt: 'CoreUI Logo' }}
                //minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
                />
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
