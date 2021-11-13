# Formik

React 表单增强。增强表单处理能力，简化表单处理流程。

[官网(https://jaredpalmer.com/formik/)](https://jaredpalmer.com/formik/)

```js
npm install formik -S
```

## 基础使用

使用 formik 进行表单数据绑定以及表单提交处理。

```jsx
import React from 'react';
import { useFormik } from 'formik';

function App () {
  const formik = useFormik({
    initialValues: { username: '张三', password: '123456' },
    onSubmit: values => {
      console.log(values);
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="text"
        name="username"
        value={ formik.values.username }
        onChange={ formik.handleChange }
      />
      <input
        type="password"
        name="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
      />
      <input
        type="submit"
      />
    </form>
  );
}

export default App;
```

## 表单验证

### 数据验证

```jsx
import React from 'react';
import { useFormik } from 'formik';

function App () {
  const formik = useFormik({
    initialValues: { username: '张三', password: '123456' },
    validate: values => {
      const errors = {};

      if (!values.username) {
        errors.username = '请输入用户名'
      } else if (!values.username.length > 15) {
        errors.username = '用户名长度不能大于 15'
      }

      if (values.password.length < 6) {
        errors.password = '密码长度必须大于 6 位'
      }

      return errors;
    },
    onSubmit: values => {
      console.log(values);
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="text"
        name="username"
        value={ formik.values.username }
        onChange={ formik.handleChange }
      />
      <p>{ formik.errors.username }</p>
      <input
        type="password"
        name="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
      />
      <p>{ formik.errors.password }</p>
      <input
        type="submit"
      />
    </form>
  );
}

export default App;
```

### 体验效果优化

提示信息时检查表单元素的值是否被更改。

```jsx
import React from 'react';
import { useFormik } from 'formik';

function App () {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validate: values => {
      const errors = {};

      if (!values.username) {
        errors.username = '请输入用户名'
      } else if (!values.username.length > 15) {
        errors.username = '用户名长度不能大于 15'
      }

      if (values.password.length < 6) {
        errors.password = '密码长度必须大于 6 位'
      }

      return errors;
    },
    onSubmit: values => {
      console.log(values);
    }
  })

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="text"
        name="username"
        value={ formik.values.username }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : '' }</p>
      <input
        type="password"
        name="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : '' }</p>
      <input
        type="submit"
      />
    </form>
  );
}

export default App;
```

## 简化表单验证

formik 配合 yup 进行表单验证。

```js
npm install yup -S
```

```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App () {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().max(15, '用户名长度不能大于 15').required('请填写用户名'),
      password: Yup.string().min(6, '密码长度必须大于 6 位').required('请填写密码')
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="text"
        name="username"
        value={ formik.values.username }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : '' }</p>
      <input
        type="password"
        name="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
        onBlur={ formik.handleBlur }
      />
      <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : '' }</p>
      <input
        type="submit"
      />
    </form>
  );
}

export default App;
```

## 简化表单代码

减少样板代码

```jsx
{ ...form.getFieldProps('username') }
```

简化后代码如下：

```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App () {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().max(15, '用户名长度不能大于 15').required('请填写用户名'),
      password: Yup.string().min(6, '密码长度必须大于 6 位').required('请填写密码')
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={ formik.handleSubmit }>
      <input
        type="text"
        name="username"
        { ...formik.getFieldProps('username') }
      />
      <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : '' }</p>
      <input
        type="password"
        name="password"
        { ...formik.getFieldProps('password') }
      />
      <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : '' }</p>
      <input
        type="submit"
      />
    </form>
  );
}

export default App;
```

## 组件方式构建表单

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';

function App () {
  const initialValues = { username: '' };
  const schema = Yup.object({
    username: Yup.string().max(15, '用户名长度不能大于 15').required('请输入用户名')
  })

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ schema }
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App;
```

## field 组件 as 属性

默认情况下，Field 组件渲染的时文本框，如要生成其他表单元素可以使用以下语法。

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';

function App () {
  const initialValues = { username: '', content: '', subject: "java" };
  const schema = Yup.object({
    username: Yup.string().max(15, '用户名长度不能大于 15').required('请输入用户名')
  })

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ schema }
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <Field as="textarea" name="content" />
        <Field as="select" name="subject">
          <option value="前端">前端</option>
          <option value="java">java</option>
        </Field>
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App;
```

## 构建自定义表单控件

### 密码输入框

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

function MyInput ({ label, ...props }) {
  const [ field, meta ] = useField(props);

  return (
    <div>
      <label htmlFor={ props.id }>{ label }</label>
      <input { ...field } { ...props } />
      { meta.touched && meta.error ? <span>{ meta.error }</span> : null }
    </div>
  )
} 

function App () {
  const initialValues = { username: '', content: '', subject: "java" };
  const schema = Yup.object({
    username: Yup.string().max(15, '用户名长度不能大于 15').required('请输入用户名'),
    password: Yup.string().min(6, '密码长度必须大于 6 位').required('请填写密码')
  })

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ schema }
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <MyInput
          id="my-password"
          name="password"
          type="password"
          placeholder="请输入密码"
          label="密码"
        />
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App;
```

### 复选框

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

function MyInput ({ label, ...props }) {
  const [ field, meta ] = useField(props);

  return (
    <div>
      <label htmlFor={ props.id }>{ label }</label>
      <input { ...field } { ...props } />
      { meta.touched && meta.error ? <span>{ meta.error }</span> : null }
    </div>
  )
}

function Checkbox ({ label, ...props }) {
  const [ field, meta, helper ] = useField(props);
  const { value } = meta;
  const { setValue } = helper;

  const handleChange = () => {
    const set = new Set(value);

    if (set.has(props.value)) {
      set.delete(props.value);
    } else {
      set.add(props.value);
    }

    setValue([ ...set ]);
  }

  return (
    <div>
      <label htmlFor="">
        <input checked={ value.includes(props.value) } type="checkbox" { ...props } onChange={ handleChange } />{ label }
      </label>
    </div>
  )
}

function App () {
  const initialValues = { username: '', hobbies: ['排球'] };
  const schema = Yup.object({
    username: Yup.string().max(15, '用户名长度不能大于 15').required('请输入用户名'),
    password: Yup.string().min(6, '密码长度必须大于 6 位').required('请填写密码')
  })

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ schema }
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <MyInput
          id="my-password"
          name="password"
          type="password"
          placeholder="请输入密码"
          label="密码"
        />
        <Checkbox value="足球" label="足球" name="hobbies" />
        <Checkbox value="篮球" label="篮球" name="hobbies" />
        <Checkbox value="排球" label="排球" name="hobbies" />
        <input type="submit" />
      </Form>
    </Formik>
  );
}

export default App;
```

