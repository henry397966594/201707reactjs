import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
/**
 * 1.初始化一个状态对象 {words:[]}
 * 2.给input框架绑定事件，当input的值发生改变的时候，调用百度的接口获取返回的数组。并且修改状态。
 */
class App extends React.Component{
  constructor(){
    super();
    this.state = {words:[]};//1.初始化一个状态对象 {words:[]}
  }
  //处理值改变事件
  handleChange =  (event)=>{
    let wd = event.target.value;//先获取到输入框的值
    // https://www.baidu.com/su?wd=a&cb=callback
    $.ajax({
      url:`http://www.baidu.com/su`,
      type:'GET',
      dataType:'jsonp',//指定返回的数据类型
      data:{wd},//如果你是GET请求，会拼接到url查询字符串中,如果是POST会放到请求体里
      jsonp:'cb',//用来指定后台获取访问方法名的参数名
      //{q:"a",p:false,s:["爱奇艺","阿里云"]};
      success:(data)=>{
        this.setState({words:data.s});
      }
    })

  }
  render(){
    return (
      <div className="container" style={{marginTop:'20px'}}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <input onChange={this.handleChange} type="text" className="form-control"/>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {
                    this.state.words.map((item,index)=>(
                      <li className="list-group-item" key={index}>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}
ReactDOM.render(<App></App>,document.querySelector('#root'));
