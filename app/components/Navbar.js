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
      <div> 
        <div className="titlebg"> 
          <div className="titlebar"> 
            <div className="content"> 
              <div className="titleLogo"/>  
              <div className="titleSub"> 
                <div className="titleChar">
                  <p>
                    <a href="#main_index">方案</a>
                  </p>
                </div>  
                <div className="titleChar">
                  <p>产品</p>
                </div>  
                <div className="titleChar">
                  <p className="activite">
                    <a href="#main_index">首页</a>
                  </p>
                </div>  
                <div className="clear"/> 
              </div>  
              <div className="titlesq"> 
                <div className="titlesqtop10"> 
                  <div className="weibo"/>  
                  <div className="weibo1">
                    <p>
                      <a href="http://e.weibo.com/gbasebi" target="blank">新浪微博</a>
                    </p>
                  </div>  
                  <div className="clear"/> 
                </div>  
                <div className="weixindiv titlesqtop35"> 
                  <div className="weixin"/>  
                  <div className="weibo1">
                    <p>微信公众号</p>
                  </div>  
                  <div className="weixinimg"/>  
                  <div className="clear"/> 
                </div> 
              </div>  
              <div className="clear"/> 
            </div> 
          </div>  
          <div id="main_index"> 
            <div className="content"> 
              <div id="bigtitle1"/>  
              <div id="bigtitle2">
                <a href="#viewAny"/>
              </div>  
              <div id="bigtitle3">
                <a href="#dataAny"/>
              </div>  
              <div id="bigtitle4">
                <a href="#expandAny"/>
              </div>  
              <div id="bigtitle5">
                <a href="#integratedAny"/>
              </div>  
              <div id="bigtitle6"/> 
            </div> 
          </div> 
        </div>  
        <div className="demostyle"> 
          <div className="content"> 
            <div className="demoDiv"> 
              <div id="demo1" className="demoPic"> 
                <div className="demoBg1"/>  
                <div className="demoShade"/>  
                <div className="demoInfo"> 
                  <p>针对各数据类型采用不同的可视化方式，更准确的展现数 据隐含的信息。灵活的互动设计过程协助用户迅速获取分 析结果。</p>  
                  <div className="demoButton">点击我就运行啦~</div> 
                </div> 
              </div>  
              <div className="demoTitle">天津市新房交易分析案例</div> 
            </div>  
            <div className="demoDiv"> 
              <div id="demo2" className="demoPic"> 
                <div className="demoBg2"/>  
                <div className="demoShade"/>  
                <div className="demoInfo"> 
                  <p>利用定时刷新功能，实时查看数据变化。丰富的可视化动态效果，让数据变化一览无余。</p>  
                  <div className="demoButton">点击我就运行啦~</div> 
                </div> 
              </div>  
              <div className="demoTitle">海洋经济评估分析案例</div> 
            </div>  
            <div className="demoDiv3"> 
              <div id="demo3" className="demoPic"> 
                <div className="demoBg3"/>  
                <div className="demoShade"/>  
                <div className="demoInfo"> 
                  <p>可扩展的函数库和预测功能，让分析手段再无限制。时尚新潮的设计工具让分析报告形式丰富绚丽，告别千篇一律。</p>  
                  <div className="demoButton">点击我就运行啦~</div> 
                </div> 
              </div>  
              <div className="demoTitle">天津空气质量检测平台</div> 
            </div>  
            <div className="clear"/> 
          </div> 
        </div> 
      </div>
      );
  }
}


export default Navbar;