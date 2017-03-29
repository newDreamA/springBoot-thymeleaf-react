/**
 * Created by tangxiewen on 2017/3/15.
 */
import  React from 'react';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';
import {Link} from 'react-router'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
    constructor(){
        super();
        this.state={
            current: 'top',
            hasLogined:false,
            modalVisible:false,
            action:'login',
            userNickName:'',
            userId:0
        }
    }
    componentWillMount(){

        if(localStorage.userId!=''){
            this.setState({userNickName:localStorage.userNickName});
            this.setState({hasLogined:true});
        }
    }

    setModalVisible(value){
        this.setState({modalVisible:value});
    }

    handleClick(e){
        if(e.key=="register"){
            this.setState({current:'register'});
            this.setModalVisible(true)
        }else{
            this.setState({current:e.key});
        }
    }

    callback(e){
        if(e.key==1){
            this.setState({action:'login'});
        }else{
            this.setState({action:'register'});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        var myFetchOption = {
            method:'GET'
        }

   //     var formData =this.props.form.validateFields;
      //  this.props.form.validateFields((err, formData) => {
        //    if (!err) {
        var formData =this.props.form.getFieldsValue();
                console.log('Received values of form: ', formData);
                console.log(formData);
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
                    + "&username="+formData.userName+"&password="+formData.password
                    +"&r_userName=" + formData.r_userName + "&r_password="
                    + formData.r_password + "&r_confirmPassword="
                    + formData.r_confirmPassword,myFetchOption)
                    .then(response=>response.json())
                    .then(json =>{
                        console.log("json"+json);
                        this.setState({userNameNick:json.NickUserName,userId:json.UserId});
                        localStorage.userId = json.UserId;
                        localStorage.userNickName = json.NickUserName;
                    });

                this.props.form.resetFields	();
                if(this.state.action=="login"){
                    this.setState({hasLogined:true});
                }

                message.success("请求成功");
                this.setModalVisible(false);
       //     }
     //   });



    };

   logout(){
       localStorage.userId="";
       localStorage.userNickName="";
       this.setState({hasLogined:false});
   }

    render(){
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined?
            <Menu.Item key="logouut" class="register">
                <Button type="primary" htmlType="button">{this.state.urserNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type="dash" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
                </Link>
            </Menu.Item>
            : <Menu.Item key="register" class="register">
            <Icon type="appstore"/>注册/登录
            </Menu.Item>;

        return(
            <header>
               <Row>
                   <Col span={2}></Col>
                   <Col span={4}>
                       <a href="/" class="logo">
                           <img src="./resources/images/logo.png" alt="logo"/>
                           <span>ReactNews</span>
                       </a>
                   </Col>
                   <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                           <Menu.Item key="top">
                               <Icon type="appstore"/>头条
                           </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key=""guoji>
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="sport">
                            <Icon type="appstore"/>体育
                            </Menu.Item>
                            {userShow}
                        </Menu>
                       <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="保存" cancelText="取消">
                           <Tabs type="card"  onChange={this.callback.bind(this)}>
                               <TabPane tab="登录" key="1">
                                   <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                       <FormItem label="账号">

                                           {getFieldDecorator('userName', {
                                               rules: [{ required: true, message: 'Please input your username!' }],
                                           })(
                                               <Input placeholder="请输入您的账号" />
                                           )}

                                       </FormItem>
                                       <FormItem label="密码">
                                           {getFieldDecorator('password', {
                                           })(
                                               <Input type="password" placeholder="请输入您的密码"/>
                                           )}

                                       </FormItem>
                                      <Button type="primary" htmlType="submit">登录</Button>
                                   </Form>
                               </TabPane>
                               <TabPane tab="注册" key="2">
                                   <Form layout="horizontal"　onSubmit={this.handleSubmit.bind(this)}>
                                       <FormItem label="账号">
                                           {getFieldDecorator('r_userName', {
                                               rules: [{ required: true, message: 'Please input your username!' }],
                                           })(
                                               <Input placeholder="请输入您的账号" />
                                           )}
                                       </FormItem>
                                       <FormItem label="密码">
                                           {getFieldDecorator('r_password', {})(
                                               <Input type="password" placeholder="请输入您的密码" />
                                           )}
                                       </FormItem>
                                       <FormItem label="确认密码">
                                           {getFieldDecorator('r_confirmPassword', {})(
                                               <Input type="password" placeholder="请再次输入您的密码" />
                                           )}
                                       </FormItem>
                                       <Button type="primary" htmlType="submit" >注册</Button>
                                   </Form>

                               </TabPane>
                           </Tabs>
                       </Modal>
                   </Col>
                   <Col span={2}></Col>
               </Row>
            </header>
        )
    }
}
export default PCHeader = Form.create({})(PCHeader)