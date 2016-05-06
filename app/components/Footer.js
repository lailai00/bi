import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let leaderboardCharacters = this.state.characters.map((character) => {
      return (
        <li key={character.characterId}>
          <Link to={'/characters/' + character.characterId}>
            <img className='thumb-md' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
          </Link>
        </li>
      )
    });

    return (
      <footer>
                <div id="ourCustomer" className="con_body whiteBody">
                  <div className = "content">
                  <div id="customerTitle">
                    <h1>客户与合作伙伴</h1>
                  </div>
                  <div id="row11" className="row1"></div>
                  <div id="row12" className="row1"></div>
                  <div id="row13" className="row1"></div>
                  <div id="row14" className="row1"></div>
                  <div id="row15" className="row1"></div>
                  <div id="row16" className="row1"></div>
                  <div id="row17" className="row1"></div>
                  <div id="row21" className="row2"></div>
                  <div id="row22" className="row2"></div>
                  <div id="row23" className="row2"></div>
                  <div id="row24" className="row2"></div>
                  <div id="row25" className="row2"></div>
                  <div id="row26" className="row2"></div>
              </div>
            </div>
                 <div id="bottom" className="con_body">
    <div className="content">
         <div  id="bottom1">
            <p>天津南大通用数据技术股份有限公司 <br/>General Data Technology Co.,Ltd.</p>
         </div>
         <div id="bottom2">
            <p>北京：北京市海淀区金源时代商务中心B座1206<br/>电话：010-88866866 
            </p>
            <p>天津：天津华苑产业区海泰发展六道6号海泰绿色产业基地J座 <br/>电话：022-58815678
            </p>
         </div>
         <div  id="bottom3">
            <p id="addresstext">公司网址：<a href="http://www.gbase.cn" target="blank">http://www.gbase.cn</a><br/>客服专线：<span >400-817-9696</span></p>
            <p  id="emailaddr">欢迎您将建议或意见发送至以下邮箱，感谢您对我们的支持！<br/><a href="mailto:bisupport@gbase.cn">Email:bisupport@gbase.cn</a></p>
         </div>
         
         <div id="bottom4">
            <p>Copyright@2004-2014 GBase <a  href="http://www.gbase.cn" target="blank">南大通用</a>. 版权所有.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn" target="blank">津ICP备05003677</a></p>
         </div>
         
         <div id="bottomline">
            
         </div>
    </div>
  </div>
</footer>
    );
  }
}

export default Footer;