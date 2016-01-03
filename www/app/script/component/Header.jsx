var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ReactIntl = require('react-intl');
var Reflux = require('reflux');
var ReactRouter = require('react-router');

var PageStore = require('../store/PageStore'),
    UserStore = require('../store/UserStore');

var PageAction = require('../action/PageAction'),
    UserAction = require('../action/UserAction');

var LoginButton = require('./LoginButton'),
    AccountDropdown = require('./AccountDropdown');

var Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    NavbarBrand = ReactBootstrap.NavbarBrand;

var Link = ReactRouter.Link;

var Header = React.createClass({
    mixins: [
        Reflux.connect(PageStore, 'pages'),
        Reflux.connect(UserStore, 'users'),
        ReactIntl.IntlMixin
    ],

    componentDidMount: function()
    {
        UserAction.requireLogin();
    },

    render: function()
    {
        var currentUser = this.state.users
            ? this.state.users.getCurrentUser()
            : null;

		return (
            <div id="header">
                <Navbar fixedTop>
    		    	<NavbarBrand>
                        <div id="logo">
                            <Link to="/">
                                <span className="cocorico-blue">co</span>
                                <span className="cocorico-dark-grey">cori</span>
                                <span className="cocorico-red">co</span>
                            </Link>
                        </div>
                    </NavbarBrand>
                    <Nav>
                        {!this.state.pages ? '' : this.state.pages.navBar().map(function(page) {
                            return (
                                <li>
                                    <Link to={'/' + page.slug} activeClassName="active">
                                        {page.title}
                                    </Link>
                                </li>
                            )
                        })}
    			    </Nav>
                    <Nav pullRight>
                        <li>
                            {!!currentUser
                                ? <Link to={this.getIntlMessage('route.MY_TEXTS')} activeClassName="active">
                                    {this.getIntlMessage('page.myTexts.TITLE')}
                                </Link>
                                : <div />}
                        </li>
                        <li>{!!currentUser ? <AccountDropdown fullName={currentUser.firstName + ' ' + currentUser.lastName}/> : ''}</li>
                        <li>{!currentUser ? <LoginButton /> : ''}</li>
                    </Nav>
    		  	</Navbar>
            </div>
		);
	}
});

module.exports = Header;