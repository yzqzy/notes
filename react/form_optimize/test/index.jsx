const { useState, useCallback,  useEffect, useReducer} = React;

function HooksForm(props) {
    const formConfigs = props.formConfigs;
    const initApi = props.initApi;
    if(!props.namespace) { // 如果没有命名空间则提示异常
        console.error("namespace is empty, may be will inspect by other form");
    }
  
    const namespace = props.namespace ? props.namespace : 'default';

    const [state, dispatch] = useReducer(reducer, {
        [`${namespace}.result`] : true,
        [`${namespace}.isLoading`] : true
    });

    function reducer(state, action) {
        action['newStats'].forEach( item => {
            state[`${namespace}.${item.name}`] = item.value;
        });
        if(action['rely']){
            const relyStates = getRelyStates(action['newStats'], state, formConfigs, namespace);
            relyStates.forEach( relyState => { // 判断是否需要依赖切换
                state[`${namespace}.${relyState.name}`] = relyState.value;
            });
        }
        return {...state};
    }

    function changeRelyStates(name, value) {
        const dispatchStats = [];
        dispatchStats.push( // 添加到待修改状态
            {
                'name' : `${name}.error`,
                'value' : !validationCheck(name, value, formConfigs),
            }
        );
        dispatch({'rely': true, 'newStats':dispatchStats}); 
    }

    /**
     * 
     * 修改状态，并且更新前端信息状态
     * @param {Array}} states 
     * @param {boolean} rely 
     * @returns 
     */
    function changeState(states, rely=true) {
        const dispatchStats = [];
        if(!(states instanceof Array)) { // 判断是否为数组，不是则返回错误
            return false;;
        }
        states.forEach( item => {
            if(!(item instanceof Array)){ // 检查合法性
                return;
            }
            if(rely){
                dispatchStats.push( // 添加到待修改状态
                    {
                        'name' : `${item[0]}.error`,
                        'value' : !validationCheck(item[0], item[1], formConfigs),
                    }
                );
            }
            dispatchStats.push( // 添加到待修改状态
                {
                    'name' : item[0],
                    'value' : item[1],
                }
            );
        });  
        // 统一执行状态变更
        dispatch({'rely': rely, 'newStats':dispatchStats}); 
    }

    /**
     * 初始化调用接口，获取初始化数据
     */
    useEffect(() => {
        async function fetchData() {
            const needChangeStats = [];
            if(!_.isEmpty(initApi)){
                const res = await axios.get(initApi);
                if (!res || !res.data || res.data.ret !== 0) { // 判断异常，异常显示错误
                    needChangeStats.push(['result', false]);
                } else { // 正常则更新状态
                    formConfigs.forEach( item => {
                        if(res.data.data && res.data.data.hasOwnProperty(item['name'])){
                            needChangeStats.push([item['name'], res.data.data[item['name']]]);
                        }
                    });
                }
            }
           
            needChangeStats.push(['isLoading', false]);

            const dispatchStats = [];
            needChangeStats.forEach( item => {
                if(!(item instanceof Array)){ // 检查合法性
                    return;
                }
                dispatchStats.push( // 添加到待修改状态
                    {
                        'name' : `${item[0]}.error`,
                        'value' : !validationCheck(item[0], item[1], formConfigs),
                    },
                    {
                        'name' : item[0],
                        'value' : item[1],
                    }
                );
            });  
             // 统一执行状态变更
             dispatch({'rely': true, 'newStats':dispatchStats}); 
        }

        fetchData();
    }, [initApi, formConfigs]); //确保只执行一次，避免被多次执行

    /**
     * 处理提交，注意这里需要依赖 states 来处理
     */
    const handleSubmit = useCallback(() => {
        let checkRet = true;
        let submitInfo = {};

        formConfigs.forEach(item => {
            if(!checkRet){
                return;
            }
            
            checkRet = checkRet && validationCheck(item['name'], state[`${namespace}.${item['name']}`], formConfigs);
            submitInfo[item['name']] = state[`${namespace}.${item['name']}`];
        });
        if(!checkRet) {
            alert('请检查红色报错部分');
        } else {
            alert(JSON.stringify(submitInfo));
        }
    }, [state, formConfigs, namespace]);

    if (state[`${namespace}.isLoading`]) {
        return ( <Loading /> );
    }
    if (!state[`${namespace}.result`]) {
        return ( <Error /> );
    }
    const domInfos = [];
    formConfigs.forEach( item => {
        domInfos.push(
            (
            <Field 
                key={item.name}
                label={item.label}
                name={item.name}
                type={item.type}
                value={state[`${namespace}.${item.name}`]}
                changeState={changeState}
                changeRelyStates={changeRelyStates}
                error={state[`${namespace}.${item.name}.error`]}
                display={state[`${namespace}.${item.name}.display`]}
                errorMsg={item.error}
            />
           )
        );
    });

    domInfos.push(
        <button key='button' onClick={handleSubmit}>提交</button>
    );
    return (domInfos);
}

function Loading() {
    return ( 
        <div >
        正在加载数据中... 
        </div>
    );
}

function Error() {
    return ( <div >
        失败了， 请稍后重试...
         </div>
    );
}

const Field = function(params) {
    let inputValue = 'value';
    let rely = false;

    switch (params.type) { // 根据类型，选择是否直接处理依赖以及获取值的方式
        case 'checkbox': 
            inputValue = 'checked';
            rely = true;
            break
        case 'text':
        case 'number':
            rely = false;
            inputValue = 'value';
            break;
        default:
            rely = false;
            inputValue = 'value';
    }   
    return  <div style={{display: params.display? 'block' : 'none'}}> 
        <label>{params.label}</label>
        <input 
            name={params.name}
            type={params.type}
            value={params.value || params.value === 0 ? params.value : ''}
            onChange={(e) => {
                const dataValue = e.target ? e.target[inputValue] : null;
                // 直接修改当前状态，并且依赖修改
                params.changeState([[params.name, dataValue]], rely);
                // 如果非依赖，则使用防抖策略
                _.debounce(() =>{
                    params.changeRelyStates(params.name, dataValue); // 
                }, 500)(params, e);
            }}
            onBlur={(e) => {
                if(!rely){ // 可以选择使用防抖或者 onBlur
                    params.changeRelyStates(params.name, e.target[inputValue]);
                }
            }}
        />
        {params.error && <label style={{color: "red"}}>{params.errorMsg}</label>}
    </div>
}

/**
 * 校验检查，判断是否符合条件
 * @param {string} name 
 * @param {string} value 
 * @param {array} formConfigs 
 * @returns 
 */
const validationCheck = function(name, value, formConfigs) {
    if(_.isEmpty(formConfigs)){
        return true;
    }
    const formItem = formConfigs.find(item => {
        return item.name === name;
    });
    if(!formItem || !formItem['validation']){
        return true;
    }
    if(typeof formItem['validation'] === 'boolean'){
        if(_.isEmpty(value) && value !== 0 && value !== true){
            return false;
        }
        return true;
    }
    return formItem['validation'].test(value);
}

/**
 * 获取依赖的状态变量，依赖变化后，定位出相应的依赖状态数组
 * @param {array} currentStates 
 * @param {function} stateData 
 * @param {array} formConfigs 
 * @param {string} namespace 
 * @returns 
 */
const getRelyStates = function(currentStates, stateData, formConfigs, namespace){
    const newStates = [];
    if(_.isEmpty(formConfigs)){
        return newStates;
    }

    let filterCurrentStats = {};
    currentStates.forEach(currentState => { // 将数据结构转换，从数据结构转换为 object
        filterCurrentStats[currentState['name']] = currentState['value'];
    })

    formConfigs.forEach(formItem => { // 遍历配置，判断每一项是否需要显示
        newStates.push(
            {
                'name' : `${formItem['name']}.display`,
                'value' : checkDisplay(formItem, filterCurrentStats, stateData, namespace)
            }
        );
    });
    return newStates;
}

/**
 * 判断是否需要展示该项
 * @param {object} formItem 
 * @param {array} filterCurrentStats 
 * @param {function} stateData 
 * @param {string} namespace 
 * @returns 
 */
function checkDisplay(formItem, filterCurrentStats, stateData, namespace) {
    if(!formItem['rely'] || formItem['rely'].length < 1){
        return true;
    }
    let enable = true;
    for(let i=0; i<formItem['rely'].length; i++){ 
        if(filterCurrentStats.hasOwnProperty(formItem['rely'][i])) { // 判断每一项依赖是否符合值，当前状态下
            if(filterCurrentStats[formItem['rely'][i]] !== formItem['relyValue'][i]) {
                enable = false;
                break;
            } 
        } else if(stateData.hasOwnProperty(`${namespace}.${formItem['rely'][i]}`)){ // 判断每一项依赖是否符合值，在 reducer 中的状态
            if(stateData[`${namespace}.${formItem['rely'][i]}`] !== formItem['relyValue'][i]) {
                enable = false;
                break;
            }
        } else {
            enable = false;
            break;
        }
    }
    return enable;
}

const initApi = 'https://www.fastmock.site/mock/1e30667a4c6ab50c7eb19db9bd72c3c5/hooks/api/index';

const formConfigs1 = [
    {
        'label' : '参与',
        'type'  : 'checkbox',
        'name'  : 'isGoing',
        'value' : true,
        'rely'   : false,
        'relyValue' : '',
        'validation' : false,
        'error' : ''
    },
    {
        'label' : '来宾人数',
        'type'  : 'number',
        'name'  : 'numberOfGuests',
        'value' : '',
        'rely' : ['isGoing'],
        'relyValue' : [true],
        'validation' : true,
        'error' : '不能为空'
    },
    {
        'label' : '联系方式',
        'type'  : 'text',
        'name'  : 'phoneNumber',
        'value' : '',
        'rely' : ['isGoing'],
        'relyValue' : [true],
        'validation' : /^1[3-9]\d{9}$/,
        'error' : '请输入正确的手机号'
    }
];

const formConfigs2 = [
  {
      'label' : '登录用户名',
      'type'  : 'text',
      'name'  : 'username',
      'value' : true,
      'rely'   : false,
      'relyValue' : '',
      'validation' : true,
      'error' : '请输入用户名'
  },
  {
      'label' : '登录密码',
      'type'  : 'password',
      'name'  : 'password',
      'value' : '',
      'rely' : false,
      'relyValue' : '',
      'validation' : true,
      'error' : '请输入密码'
  },
  {
      'label' : '隐私条款',
      'type'  : 'checkbox',
      'name'  : 'privateInfo',
      'value' : '',
      'rely' : false,
      'relyValue' : '',
      'validation' : true,
      'error' : '请同意隐私协议'
  }
];

ReactDOM.render(
 <div>
     <HooksForm formConfigs={formConfigs1} initApi={initApi} namespace={Math.random().toString(36).substr(3)}/>
     <HooksForm formConfigs={formConfigs2} namespace={Math.random().toString(36).substr(3)}/>
 </div>,
  document.getElementById('root')
);