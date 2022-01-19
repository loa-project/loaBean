import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import ninavCard from '../../img/component/page/CardSimul/ninav.png';
import cadanCard from '../../img/component/page/CardSimul/cadan.png';
import ajenaCard from '../../img/component/page/CardSimul/ajena.png';
import bahunCard from '../../img/component/page/CardSimul/bahun.png';
import silianCard from '../../img/component/page/CardSimul/silian.png';
import weiCard from '../../img/component/page/CardSimul/wei.png';
import shandiCard from '../../img/component/page/CardSimul/shandi.png';
import selectpackCard from '../../img/component/page/CardSimul/selectpack.png';
import '../css/cardSimul.css';
class CardInfoForm extends Component {
    state = {
        ninav:0, cadan:0, wei:0, bahun:0, silian:0, ajena:0, shandi:0, selectpack:0,resultFlag: false, price: 0, min: 0, max: 0
    }
    componentDidMount() {
        this.setState({ninav:0, cadan:0, wei:0, bahun:0, silian:0, ajena:0, shandi:0, selectpack:0,resultFlag: false});
    }
    sumCard = (stat,arg) => {
        var sum=0;
        var gakInfo=[];
        for(var i=0;i<=6;i++) {
            var gaks = this.getGak(stat[i]);
            gakInfo.push(gaks);
        }
        var selectGak = this.selectChance(gakInfo,stat[7]);
        var min_index=0;
        var min=99;
        for(i=0;i<7;i++) {
            if(min>selectGak[i].gak) {
                min_index=i;
                min=selectGak[i].gak;
            }
        }
        for(i=0;i<7;i++) {
            if(i !== min_index && selectGak[i].gak !== -1) {
                sum+=selectGak[i].gak;
            }
        }
        return sum;
    }
    selectChance = (arg, sp) => {
        var gaks = [];
        for(var i=0;i<=6;i++) gaks.push(arg[i]);
        var k=[1,1,2,3,4,5];
        while(1){
            var min_mod=99;
            var min_index=0;
            for(i=0;i<=6;i++) {
                if(min_mod>k[gaks[i].gak+1]-gaks[i].mod && i!==1 && gaks[i].gak !==5) {
                    min_mod=k[gaks[i].gak+1]-gaks[i].mod;
                    min_index=i;
                }
                else if(min_mod===k[gaks[i].gak+1]-gaks[i].mod && i!==1 && gaks[i].gak !== 5) {
                    if(gaks[min_index].gak > gaks[i].gak) {
                        min_mod=k[gaks[i].gak+1]-gaks[i].mod;
                        min_index=i;
                    }
                }
            }
            if(sp-min_mod>=0) {
                gaks[min_index].gak+=1;
                gaks[min_index].mod=0;
                sp-=min_mod;
            }
            else break;
        }
        return gaks;
    }
    cardSimulation = (arg) => {
        //1,1,2,3,4,5
        var minPack=99999;
        var maxPack=0;
        var ninav=this.state.ninav, cadan=this.state.cadan, wei=this.state.wei,
        bahun=this.state.bahun, ajena=this.state.ajena, silian=this.state.silian,
        selectpack=this.state.selectpack, shandi=this.state.shandi;
        var buySum=0;
        for(var ns=0;ns<10000;ns++) {
            var buyPack=0;
            var stat = [ninav,cadan,wei,bahun,silian,ajena,shandi,selectpack];
            while(1) {
                var sum = this.sumCard(stat,arg);
                if(arg<=sum) {
                    break;
                }
                else {
                    var nl = this.openTenPack();
                    buyPack++;
                    if(nl>0) {
                        for(var i=0;i<nl;i++) {
                            var lc = this.openLegendPack();
                            if(lc<7) stat[lc]++;
                        }
                    }
                }
            }
            buySum+=buyPack;
            if(buyPack<minPack) minPack=buyPack
            if(buyPack>maxPack) maxPack=buyPack;
        }
        var res = Math.floor(buySum/10000);
        this.setState({min:minPack, max:maxPack, resultFlag:true, price: res});
    }
    getGak= (num) => {
        var res = {
            gak:-1, mod:0
        };
        res.mod=num;
        var k=[1,1,2,3,4,5];
        var i=0;
        while(res.mod-k[i]>=0) {
            num-=k[i++];
            res.gak++;
            res.mod = num;
        }
        //console.log(res.gak+"!!");
        return res;
    }
    openTenPack = () => {
        var res=0;
        for(var i=0;i<10;i++) {
            if(this.getDeck()) res+=1;
        }
        return res;
    }
    openLegendPack = () => {
        return Math.floor((Math.random()*100))%20;
    }
    getDeck = () => {
        var percent = Math.floor((Math.random()*100));
        if(percent >=1 && percent <=4) return true;
        else return false;
    }
    onCardChange = (event) => {
        let id=event.target.id;
        if(id==="ninav") this.setState({ninav: event.target.value});
        if(id==="cadan") this.setState({cadan: event.target.value});
        if(id==="wei") this.setState({wei: event.target.value});
        if(id==="bahun") this.setState({bahun: event.target.value});
        if(id==="silian") this.setState({silian: event.target.value});
        if(id==="ajena") this.setState({ajena: event.target.value});
        if(id==="selectpack") this.setState({selectpack: event.target.value});
    }
    render() {
        const tableStyle = {
            margin:'auto',
            border: 'solid 2px white'
        }
        const searchStyle = {
            width:'50px',
            margin:'auto'
        }
        const buttonStyle = {

        }
        if(!this.state.resultFlag)
        return(
            <Form>
                <table style={tableStyle} className="cardTable">
                    <thead>
                        <tr>
                            <td>니나브</td>
                            <td>카단</td>
                            <td>아제나&이난나</td>
                            <td>바훈투르</td>
                            <td>실리안</td>
                            <td>샨디</td>
                            <td>웨이</td>
                            <td style={{fontSize:"15px"}}>전설 카드 선택팩</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={ninavCard} /></td>
                            <td><img src={cadanCard} /></td>
                            <td><img src={ajenaCard} /></td>
                            <td><img src={bahunCard} /></td>
                            <td><img src={silianCard} /></td>
                            <td><img src={shandiCard} /></td>
                            <td><img src={weiCard} /></td>
                            <td><img src={selectpackCard} style={{width:"100px"}}/></td>
                        </tr>
                        <tr>
                            <td><Form.Control
                                id="ninav"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="cadan"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="ajena"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="bahun"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="silian"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="shandi"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="wei"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                            <td><Form.Control
                                id="selectpack"
                                type="search"
                                maxLength="2"
                                placeholder="개수"
                                onChange={this.onCardChange}
                                style={searchStyle}
                                /></td>
                        </tr>
                        <tr style={{height:"60px"}}>
                            <td colSpan={2}></td>
                            <td colSpan={2}><Button
                                type="button"
                                onClick={()=>this.cardSimulation(18)}
                                style={buttonStyle}
                                >
                                <b>18각 계산</b>
                                </Button></td>
                            <td colSpan={2}><Button
                            type="button"
                            onClick={()=>this.cardSimulation(30)}
                            style={buttonStyle}
                            >
                            <b>30각 계산</b>
                            </Button></td>
                            <td colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
                <br/><br/>
            </Form>
        );
        else return(
            <div>
                <br/><br/><br/><br/><br/><b>
                당신은 평균적으로 {this.state.price} 번 전설/희귀 카드팩을 구매해야 합니다.<br/>
                가격은 {this.state.price * 230} 크리스탈({Math.floor(this.state.price * 230 * 27.5)}원)이 소모되며, 
                시간은 {Math.floor(this.state.price/2)}~{this.state.price}일이 소요됩니다.<br/>
                가장 운이 좋은 경우 {this.state.min} 회, 가장 운이 나쁜 경우는 {this.state.max}회 구매하였습니다.<br/>
                이는 전설/희귀 카드팩 매수만으로 얻는 카드를 통한 시뮬레이션이므로 실제로는 더 적은 비용이 소모될 것입니다.
                </b><br/><br/>
            </div>
        );
    }
}

class CardSimul extends Component {
    state = {

    };
    render() {
        const exStyle = {
            textAlign:'center',
            border: '1px solid white',
            backgroundColor: "#999999",
            width:'60%',
            margin:'auto',
        };
        return(
            <div>
                <br/><br/><br/><br/><br/><br/>
                <div style={exStyle}>
                    <div>
                        <p>
                        세구빛 계산기 입니다.<br/>
                        본인이 가지고 계신 세구빛 카드의 숫자와 전설 선택 카드팩 숫자를 알맞게 입력하시면<br/>
                        전설/희귀 카드팩 구매 시 평균 비용을 계산해줍니다.<br/>
                        10000번의 시뮬레이션에서 나온 결과가 출력됩니다.<br/>
                        <b style={{color:'red'}}>*개수는 0각이라도 있을경우 1장으로 계산해주세요(ex 1각+1=3장)*</b><br/>
                        </p>
                    </div>
                    <CardInfoForm/>
                </div>
            </div>
        );
    }
}

export default CardSimul;