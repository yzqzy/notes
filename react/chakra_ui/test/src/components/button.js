const ButtonStyle = {
  baseStyle: {
    borderRadius: 'lg'
  },
  sizes: {
    sm: {
      px: 3,
      py: 1,
      fontSize: '12px'
    },
    md: {
      px: 4,
      py: 2,
      fontSize: '14px'
    }
  },
  variants: {
    primary: {
      bgColor: 'blue.500',
      color: 'white'
    },
    danger: {
      bgColor: 'red.500',
      color: 'white'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
}

export default ButtonStyle;
