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
              <div className="titlesqtop10">
                <div className="weibo"></div>
                <div className="weibo1"><p><a href="http://e.weibo.com/gbasebi" target="blank">新浪微博</a></p></div>
                <div className="clear"></div>
              </div>
              <div className="weixindiv titlesqtop35">
                <div className="weixin"></div>
                <div className="weibo1"><p>微信公众号</p></div>
                <div className="weixinimg"><div> </div>
                <div className="clear"></div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div id="main_index">
          <div className="content">
            <div id="bigtitle1"></div>
            <div id="bigtitle2"><a href="#viewAny"></a></div>
            <div id="bigtitle3"><a href="#dataAny"></a></div>
            <div id="bigtitle4"><a href="#expandAny"></a></div>
            <div id="bigtitle5"><a href="#integratedAny"></a></div>
            <div id="bigtitle6"></div>
          </div>
        </div>
    <div className="demostyle">
      <div className="content">
 
        <div className="demoDiv">
          <div id="demo1" className="demoPic">
            <div className="demoBg"></div>
            <div className="demoShade"></div>
            <div className="demoInfo">
              <p>针对各数据类型采用不同的可视化方式，更准确的展现</p>
              <p>数据隐含的信息。灵活的互动设计过程协助用户迅速获取分析结果。</p>
              <div className="demoButton" >点击我就运行啦~</div>
            </div>
          </div>
          <div className="demoTitle">天津市新房交易分析案例</div>
        </div>

     </div>
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