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
