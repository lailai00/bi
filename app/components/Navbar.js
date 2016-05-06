import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getCharacterCount();

    let socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm.getDOMNode(),
        router: this.context.router
      });
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className="titlebar" >
          <div className="content">
            <div className="titleLogo"></div>
            <div className="titleSub">
              <div className="titleChar"><p><a href="#main_index">方案</a></p></div>
              <div className="titleChar"><p>产品</p></div>
              <div className="titleChar"><p className="activite"><a href="#main_index">首页</a></p></div>
              <div className="clear"></div>
            </div>
            <div className="titlesq">
              <div>
                <div className="t_sq_lg"></div>
                <div><p><a href="http://e.weibo.com/gbasebi" target="blank">新浪微博</a></p></div>
                <div className="clear"></div>
              </div>
              <div className="weixindiv">
                <div></div>
                <div><p>微信公众号</p></div>
                <div className="weixinimg"> </div>
                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </nav>
      );
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Navbar;