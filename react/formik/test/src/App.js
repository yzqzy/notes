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
