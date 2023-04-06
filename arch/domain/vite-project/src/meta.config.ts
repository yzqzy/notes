type FormContext = {
  user: {
    state: string
  }
}

export default {
  form: {
    type: 'form',
    items: [
      { type: 'input', path: ['user', 'name'], default: 'hello' }
      // {
      //   type: 'condition',
      //   cond: (ctx: FormContext) => {
      //     return ctx.user.state === 'loggedIn' ? 0 : 1
      //   },
      //   items: [
      //     {
      //       type: 'input',
      //       path: ['lang', 'ts']
      //     },
      //     {
      //       type: 'input',
      //       path: ['land', 'node']
      //     }
      //   ]
      // }
    ]
  }
}
