import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";

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
        const searchStyle = {

        }
        const buttonStyle = {

        }
        if(!this.state.resultFlag)
        return(
            <Form>
                니나브: <Form.Control
                id="ninav"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                카단: <Form.Control
                id="cadan"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                웨이: <Form.Control
                id="wei"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                바훈투르: <Form.Control
                id="bahun"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                실리안: <Form.Control
                id="silian"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                아제나&이난나: <Form.Control
                id="ajena"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                샨디: <Form.Control
                id="shandi"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                전선팩: <Form.Control
                id="selectpack"
                type="search"
                maxLength="5"
                placeholder="숫자 입력"
                onChange={this.onCardChange}
                style={searchStyle}
                /><br/>
                <Button
                type="button"
                onClick={()=>this.cardSimulation(18)}
                style={buttonStyle}
                >
                <b>18각 계산</b>
                </Button>
                <Button
                type="button"
                onClick={()=>this.cardSimulation(30)}
                style={buttonStyle}
                >
                <b>30각 계산</b>
                </Button>
            </Form>
        );
        else return(
            <div>
                <br/><br/><br/><br/><br/>
                당신은 평균적으로 {this.state.price} 번 전설/희귀 카드팩을 구매해야 합니다.<br/>
                가격은 {this.state.price * 230} 크리스탈({Math.floor(this.state.price * 230 * 27.5)}원)이 소모되며, 
                시간은 {Math.floor(this.state.price/2)}~{this.state.price}일이 소요됩니다.<br/>
                가장 운이 좋은 경우 {this.state.min} 회, 가장 운이 나쁜 경우는 {this.state.max}회 구매하였습니다.<br/>
                이는 전설/희귀 카드팩 매수만으로 얻는 카드를 통한 시뮬레이션이므로 실제로는 더 적은 비용이 소모될 것입니다.
            </div>
        );
    }
}

class CardSimul extends Component {
    state = {

    };
    render() {
        return(
            <div>
                <br/><br/><br/><br/><br/>
                <p>
                세구빛 계산기 입니다.<br/>
                본인이 가지고 계신 세구빛 카드의 숫자와 전설 선택 카드팩 숫자를 알맞게 입력하시면<br/>
                드는 평균 비용을 계산해줍니다.<br/>
                10000번의 시뮬레이션에서 나온 결과가 출력됩니다.<br/>
                </p>
                <CardInfoForm/>
            </div>
        );
    }
}

export default CardSimul;